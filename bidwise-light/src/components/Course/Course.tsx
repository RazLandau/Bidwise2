import * as React from 'react';
import { connect } from 'react-redux';
import {Table} from 'wix-style-react/Table';
import {
  TableToolbar,
  ItemGroup,
  Item,
} from 'wix-style-react/TableToolbar';
import { SortDescending, Add, FoodOutOfStock, ChevronDown } from 'wix-style-react/new-icons';
import IconWithOptions from 'wix-style-react/IconWithOptions';
import Dropdown from 'wix-style-react/Dropdown';
import Search from 'wix-style-react/Search';
import Card from 'wix-style-react/Card';
import Page from 'wix-style-react/Page';
import Button from 'wix-style-react/Button';
import TextLink from 'wix-style-react/TextLink';
import Text from 'wix-style-react/Text';
import Highlighter from 'wix-style-react/Highlighter';
import { updateCourse, updateIsAddModalOpen } from '../../actions';
import { FeedbacksServerApi } from '../../services/feedbacks-server-api';
import * as styles from './Course.scss'

const createDataSet = setIndex => [
  {id: `${setIndex}-1`, semester: '2019ב', lecturer: `מרצה טוב`, summary: 'אחלה בחלה', easy: 5, interesting: 3, recommended: 1, text: 'מרצה טוב היה טוב, היה גם אחלה וגם בחלה'},
  {id: `${setIndex}-2`, semester: '2018ב', lecturer: `מרצה בינוני`, summary: 'יופי טופי', easy: 1, interesting: 5, recommended: 3},
  {id: `${setIndex}-3`, semester: '2018א', lecturer: `מרצה רע`, summary: 'איכסה פיכסה', easy: 3, interesting: 1, recommended: 5},
];

const allData = [1,2,3,4,5,6,7,8,9].reduce((accum, index) => accum.concat(createDataSet(index)), []);

export enum SEARCH_CATEGORY {
  SEMESTER,
  LECTURER,
}

export enum SORT_CATEGORY {
  SEMESTER,
  EASY,
  INTERESTING,
  RECOMMENDED,
}

export interface CourseProps {
  onBackClicked: Function;
  openAddModal: Function;
  course: { name: string, id: string };
}

class Course extends React.Component<CourseProps> {
  state = {
    data: allData,
    sortCategory: SORT_CATEGORY.SEMESTER,
    searchCategory: SEARCH_CATEGORY.SEMESTER,
    searchTerm: '',
    rowExpanded: undefined,
    feedbacks: [],
    loaded: true,
  }

  feedbacksServerApi = new FeedbacksServerApi();

  // async componentDidMount() {
  //   const { id } = this.props.course;
  //   const feedbacks = (await this.feedbacksServerApi.getFeedbacks({
  //     courseId: id,
  //   })).feedbacks;
  //   this.setState({
  //     feedbacks,
  //     loaded: true,
  //   });
  // }

  render() {
    const tableData = this.getProcessedData();

    return this.state.loaded ? (
      <div
        className="rtl"
        dir="rtl"
        style={{
          boxShadow: '0 -1px 0 0px rgba(41,85,115,.21)',
          display: 'flex',
          flexFlow: 'column',
          minWidth: '966px',
          height: 'calc(100vh - 50px)',
        }}
        >
        <Table
          withWrapper={false}
          dataHook="story-table-example"
          data={tableData}
          itemsPerPage={20}
          columns={[
              {title: 'סמסטר', render: row => <Highlighter match={this.state.searchCategory === SEARCH_CATEGORY.SEMESTER ? this.state.searchTerm : undefined}>{row.semester}</Highlighter>, width: '20%', minWidth: '100px'},
              {title: 'מרצה', render: row => <Highlighter match={this.state.searchCategory === SEARCH_CATEGORY.LECTURER ? this.state.searchTerm : undefined}>{row.lecturer}</Highlighter>, width: '20%', minWidth: '100px'},
              {title: 'אמ;לק', render: row => row.tldr, width: '20%', minWidth: '100px'},
              {title: 'קל', render: row => this.renderRating('💯', row.easy), width: '20%', minWidth: '100px'},
              {title: 'מעניין', render: row => this.renderRating('🧠', row.interesting), width: '20%', minWidth: '100px'},
              {title: 'מומלץ', render: row => this.renderRating('👍', row.recommended), width: '20%', minWidth: '100px'},
              {title: '', width: '0%', render: (rowData, rowNum) => <span className={styles.arrow}><ChevronDown size="32px" /></span>}
          ]}
          showLastRowDivider
          rowDetails={(row, rowNum) => <div style={{ padding: '10px', backgroundColor: '#F4FAFE' }}><Text>{row.text}</Text></div>}
          dynamicRowClass={(rowData, rowNum) => rowNum === this.state.rowExpanded ? styles.expandedRow : styles.row}
          onRowClick={(rowData, rowNum) => this.state.rowExpanded !== rowNum  && this.setState({ rowExpanded: rowNum })}
          >
          <Page upgrade maxWidth='none'>
            <Page.Header
              title={this.props.course.name}
              actionsBar={
                <Button onClick={this.props.openAddModal} theme="icon-standard" height="large">
                  <Add />
                </Button>
              }
              showBackButton
              onBackClicked={() => this.props.onBackClicked()}
            />
            <Page.FixedContent>
              <Card>
                {this.renderMainToolbar()}
                {tableData.length ? (
                  <Table.Titlebar/>
                ) : (
                  <Table.EmptyState
                    image={<FoodOutOfStock size="200px" />}
                    title={
                      <Text>
                        לצערנו, אין עדיין תגובות עבור
                        <Text style={{ margin: '0 4px' }}>{this.searchCategoryText()}</Text>
                        <Text weight="normal">{`"${this.state.searchTerm}"`}</Text>
                      </Text>
                    }
                    subtitle={
                      <TextLink onClick={this.props.openAddModal} underlineStyle="never">מה דעתך?</TextLink>
                    }
                  />
                )}
              </Card>
            </Page.FixedContent>
            <Page.Content>
              <Card>
                <Table.Content titleBarVisible={false}/>
              </Card>
            </Page.Content>
          </Page>
        </Table>
      </div>
    ) : <div data-hook="is-loading" />
  }

  getProcessedData() {
    return this.sortData(
      this.filterData(
        this.props.feedbacks
      )
    );
  }

  filterData(data) {
    const { searchTerm, searchCategory } = this.state;
    if (searchTerm !== '') {
      switch (searchCategory) {
        case SEARCH_CATEGORY.SEMESTER:
          return data.filter(row => row.semester.toUpperCase().includes(searchTerm.toUpperCase()));
        case SEARCH_CATEGORY.LECTURER:
          return data.filter(row => row.lecturer.toUpperCase().includes(searchTerm.toUpperCase()));
        default:
          return data;
      }
    }
    return data;
  }

  sortData(data) {
    const { sortCategory } = this.state;
    switch (sortCategory) {
      case SORT_CATEGORY.SEMESTER:
        return data.sort((rowA, rowB) => rowB.semester.localeCompare(rowA.semester))
      case SORT_CATEGORY.EASY:
        return data.sort((rowA, rowB) => rowB.easy - rowA.easy);
      case SORT_CATEGORY.INTERESTING:
        return data.sort((rowA, rowB) => rowB.interesting - rowA.interesting);
      case SORT_CATEGORY.RECOMMENDED:
        return data.sort((rowA, rowB) => rowB.recommended - rowA.recommended);
      default:
        return data;

    }
  }

  renderRating(symbol: string, count: number) {
    const rating = [];
    for (let i = 0; i < count; i++) {
      rating.push(
        <Text
          key={i}
          size="small"
        >
          {symbol}
        </Text>,
      );
    }
    return rating;
  }

  renderMainToolbar() {
    return (
      <TableToolbar>
        <ItemGroup position="start">
          <Item>
            <div style={{ display: 'flex' }}>
              {this.renderDropdown()}
              {this.renderSearch()}
            </div>
          </Item>
        </ItemGroup>
        <ItemGroup position="end">
          <Item>
            {this.renderSort()}
          </Item>
        </ItemGroup>
      </TableToolbar>
    );
  }

  renderSearch() {
    return (
      <Search
        theme="material"
        onChange={e => this.setState({ searchTerm: e.target.value })}
        value={this.state.searchTerm}
        placeholder=""
      />
    );
  }

  renderDropdown() {
    return (
      <div className="rtl" style={{ width: '120px', marginLeft: '5px' }}>
        <Dropdown
          roundInput
          selectedId={this.state.searchCategory}
          onSelect={option => this.setState({ searchCategory: option.id, searchTerm: '' })}
          options={[
            {
              id: -2,
              value: 'חיפוש ע״פ:',
              disabled: true,
            },
            {
              id: -1,
              value: '-'
            },
            {
              id: 0,
              value: 'סמסטר'
            },
            {
              id: 1,
              value: 'מרצה'
            },
          ]}
        />
      </div>
    );
  }

  renderSort() {
    const options = [
      {id: -2, value: 'מיון יורד ע״פ:', disabled: true},
      {id: -1, value: '-'},
      {id: 0, value: 'סמסטר'},
      {id: 1, value: 'קל'},
      {id: 2, value: 'מעניין'},
      {id: 3, value: 'מומלץ'}
    ];
    return (
      <div style={{ display: 'flex', width: '0px', marginLeft: '30px', transform: 'translate(0, 13px)'}}>
        <IconWithOptions
          dataHook="story-iconWithOptions"
          selectedId={this.state.sortCategory}
          onSelect={option => this.setState({ sortCategory: option.id })}
          dropdownWidth="135px"
        >
          <IconWithOptions.Icon>
            <SortDescending style={{ cursor: 'pointer', color: '#3899EC'}} />
          </IconWithOptions.Icon>
          {this.optionsToArray(options)}
        </IconWithOptions>
      </div>
    );
  }

  optionsToArray(options){
    return (
      options.map(option => {
        const {value, ...props} = option;
        return <IconWithOptions.Option key={option.id} {...props}>{value}</IconWithOptions.Option>;
      })
    );
  }

  searchCategoryText() {
    switch(this.state.searchCategory) {
      case SEARCH_CATEGORY.LECTURER:
        return 'המרצה'
      case SEARCH_CATEGORY.SEMESTER:
        return 'הסמסטר'
    }
  }
}

const mapStateToProps = state => ({
  course: state.course,
});

const mapDispatchToProps = dispatch => ({
  onBackClicked: (): void => dispatch(updateCourse(null)),
  openAddModal: () => dispatch(updateIsAddModalOpen(true)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Course);
