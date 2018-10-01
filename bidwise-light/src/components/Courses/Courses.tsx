import * as React from 'react';
import { connect } from 'react-redux';
import {Table} from 'wix-style-react/Table';
import {
  TableToolbar,
  ItemGroup,
  Item,
} from 'wix-style-react/TableToolbar';
import { SortDescending, Add, FoodOutOfStock, ChevronLeft } from 'wix-style-react/new-icons';
import IconWithOptions from 'wix-style-react/IconWithOptions';
import Dropdown from 'wix-style-react/Dropdown';
import Search from 'wix-style-react/Search';
import Card from 'wix-style-react/Card';
import Page from 'wix-style-react/Page';
import Button from 'wix-style-react/Button';
import TextLink from 'wix-style-react/TextLink';
import Text from 'wix-style-react/Text';
import Highlighter from 'wix-style-react/Highlighter';
import Tooltip from 'wix-style-react/Tooltip';
import { updateCourse, updateIsAddModalOpen } from '../../actions';
import * as styles from './Courses.scss'

const createDataSet = setIndex => [
  {id: `${setIndex}-1`, course: `סיבוכיות`, school: 'מדעי המחשב', faculty: 'מדעים מדויקים', comments: 3, easy: 1, interesting: 5, recommended: 5},
  {id: `${setIndex}-2`, course: `פסיכולוגיה ניסויית`, school: 'פסיכולוגיה', faculty: 'מדעי החברה', comments: 2, easy: 5, interesting: 1, recommended: 3},
  {id: `${setIndex}-3`, course: `מתמטיקה בדידה`, school: 'מתמטיקה', faculty: 'מדעים מדויקים', comments: 1, easy: 3, interesting: 3, recommended: 3},
];

const allData = [1, 2, 3, 4, 5].reduce((accum, index) => accum.concat(createDataSet(index)), []);

export enum SEARCH_CATEGORY {
  COURSE,
  SCHOOL,
  FACULTY,
}

export enum SORT_CATEGORY {
  COMMENTS,
  EASY,
  INTERESTING,
  RECOMMENDED,
}

export interface CoursesProps {
  updateCourse: Function;
  openAddModal: Function;
  courses: {}[];
}

class Courses extends React.Component<CoursesProps> {
  state = {
    data: allData,
    collectionId: 0,
    filterId: 0,
    sortCategory: SORT_CATEGORY.COMMENTS,
    searchCategory: SEARCH_CATEGORY.COURSE,
    searchTerm: '',
  }

  render() {
    const tableData = this.getProcessedData();

    return (
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
              {title: 'קורס', render: row => <Highlighter match={this.state.searchCategory === SEARCH_CATEGORY.COURSE ? this.state.searchTerm : undefined}>{row.course}</Highlighter>, width: '30%', minWidth: '150px'},
              {title: 'חוג', render: row => <Highlighter match={this.state.searchCategory === SEARCH_CATEGORY.SCHOOL ? this.state.searchTerm : undefined}>{row.school}</Highlighter>, width: '20%', minWidth: '100px'},
              {title: 'פקולטה', render: row => <Highlighter match={this.state.searchCategory === SEARCH_CATEGORY.FACULTY ? this.state.searchTerm : undefined}>{row.faculty}</Highlighter>, width: '20%', minWidth: '100px'},
              {title: 'תגובות', render: row => row.comments, width: '20%', minWidth: '100px'},
              {title: 'קל', render: row => this.renderRating('💯', row.easy), width: '20%', minWidth: '100px'},
              {title: 'מעניין', render: row => this.renderRating('🧠', row.interesting), width: '20%', minWidth: '100px'},
              {title: 'מומלץ', render: row => this.renderRating('👍', row.recommended), width: '20%', minWidth: '100px'},
              {title: '', width: '0%', render: row => <span className={styles.arrow}><ChevronLeft size="32px" /></span>}
          ]}
          showLastRowDivider
          onRowClick={(rowData, rowNum) => this.props.updateCourse({ name: rowData.course, id: rowData.id })}
          rowClass={styles.row}
          >
          <Page>
            <Page.Header
              title="כל הקורסים"
              actionsBar={
                <Button onClick={this.props.openAddModal} theme="icon-standard" height="large">
                  <Add />
                </Button>
              }
            />
            <Page.FixedContent>
              <Card>
                {this.renderMainToolbar()}
                {tableData.length ? (
                  <Table.Titlebar/>
                ) : (
                  <div style={{ paddingBottom: '30px' }}>
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
                    >
                    </Table.EmptyState>
                    </div>
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
    );
  }

  getProcessedData() {
    return this.sortData(
      this.filterData(
        this.props.courses
      )
    );
  }

  filterData(data) {
    const { searchTerm, searchCategory } = this.state;
    if (searchTerm !== '') {
      switch (searchCategory) {
        case SEARCH_CATEGORY.COURSE:
          return data.filter(row => row.course.toUpperCase().includes(searchTerm.toUpperCase()));
        case SEARCH_CATEGORY.SCHOOL:
          return data.filter(row => row.school.toUpperCase().includes(searchTerm.toUpperCase()));
        case SEARCH_CATEGORY.FACULTY:
          return data.filter(row => row.faculty.toUpperCase().includes(searchTerm.toUpperCase()));
        default:
          return data;
      }
    }
    return data;
  }

  sortData(data) {
    const { sortCategory } = this.state;
    switch (sortCategory) {
      case SORT_CATEGORY.COMMENTS:
        return data.sort((rowA, rowB) => rowB.comments - rowA.comments)
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
        onChange={e => this.setState({searchTerm: e.target.value})}
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
              value: 'קורס'
            },
            {
              id: 1,
              value: 'חוג'
            },
            {
              id: 2,
              value: 'פקולטה'
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
      {id: 0, value: 'תגובות'},
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

  renderAdd() {
    return (
      <Tooltip
        content="הוספת תגובה חדשה"
        shouldCloseOnClickOutside
        theme="light"
        placement="bottom"
      >
        <Button
          height="small"
          theme="icon-standard"
        >
          <Add size="20px" />
        </Button>
      </Tooltip>
    );
  }

  searchCategoryText() {
    switch(this.state.searchCategory) {
      case SEARCH_CATEGORY.COURSE:
        return 'הקורס'
      case SEARCH_CATEGORY.SCHOOL:
        return 'החוג'
      case SEARCH_CATEGORY.FACULTY:
        return 'הפקולטה'
    }
  }
}

const mapDispatchToProps = dispatch => ({
  updateCourse: (course: object): void => dispatch(updateCourse(course)),
  openAddModal: () => dispatch(updateIsAddModalOpen(true)),
});

export default connect(null, mapDispatchToProps)(Courses);
