import { memo, isValidElement, useCallback, useRef } from 'react';
import { withRouter, RouterProps } from 'next/router';
import { Row, Col, List, Pagination, Spin } from 'antd';
import Link from 'next/link';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ReducersState } from '../redux/store';
import { RepoItem } from '../redux/types/repos';
import { SearchState } from '../redux/types/search';
import styled from 'styled-components';
import { NextFunctionComponent } from 'next';
import { searchingRepos } from '../redux/actions/search';
import Repo from '../components/common/repo';

const isServer = typeof window === 'undefined';
const per_page = 20;
function noop() {}

const FilterLink = memo(
  ({ name, query, lang, sort, order, page, handleClick }: any) => {
    let queryString = `?query=${query}`;
    if (lang) queryString += `&lang=${lang}`;
    if (sort) queryString += `&sort=${sort}&order=${order || 'desc'}`;
    if (page) queryString += `&page=${page}`;
    queryString += `&per_page=${per_page}`;

    const handleOnclick = useCallback(() => {
      let qs = `?q=${query}`;
      if (lang) qs += `+language:${lang}`;
      if (sort) qs += `&sort=${sort}&order=${order || 'desc'}`;
      if (page) qs += `&page=${page}`;
      qs += `&per_page=${per_page}`;
      handleClick(qs);
    }, []);
    return (
      <Link href={`/search${queryString}`}>
        <div onClick={handleOnclick}>
          {isValidElement(name) ? name : <a>{name}</a>}
        </div>
      </Link>
    );
  },
);

const LANGUAGES = ['JavaScript', 'HTML', 'CSS', 'TypeScript', 'Java', 'Rust'];
const SORT_TYPES = [
  {
    name: 'Best Match',
  },
  {
    name: 'Most Stars',
    value: 'stars',
    order: 'desc',
  },
  {
    name: 'Fewest Stars',
    value: 'stars',
    order: 'asc',
  },
  {
    name: 'Most Forks',
    value: 'forks',
    order: 'desc',
  },
  {
    name: 'Fewest Forks',
    value: 'forks',
    order: 'asc',
  },
];

interface RouterWithQuery extends RouterProps {
  query: {
    query: string;
    sort: string;
    lang: string;
    order: string;
    page: string;
  };
}

interface SearchProps {
  router: RouterWithQuery;
  search: SearchState;
  searchingRepos: any;
}

const Search: NextFunctionComponent<any> = ({
  router,
  search,
  searchingRepos,
}: SearchProps) => {
  const { ...querys } = router.query;
  const { lang, sort, order, page, query } = router.query;
  const lastFetchIdRef = useRef(0);
  const handleClick = useCallback((qs: string) => {
    lastFetchIdRef.current += 1;
    const fetchId = lastFetchIdRef.current;
    searchingRepos(qs, fetchId);
  }, []);
  return (
    <Container>
      <Row gutter={20}>
        <Col span={6}>
          <MarginBtnList
            bordered={true}
            header={<ListHeader>Languages</ListHeader>}
            dataSource={LANGUAGES}
            renderItem={(item) => {
              const selected = lang === item;

              return (
                <StyledListItem selected={selected}>
                  {selected ? (
                    <span>{item}</span>
                  ) : (
                    <FilterLink
                      {...querys}
                      lang={item}
                      name={item}
                      handleClick={handleClick}
                    />
                  )}
                </StyledListItem>
              );
            }}
          />
          <List
            bordered={true}
            header={<ListHeader>Sort</ListHeader>}
            dataSource={SORT_TYPES}
            renderItem={(item) => {
              let selected = false;
              if (item.name === 'Best Match' && !sort) {
                selected = true;
              } else if (item.value === sort && item.order === order) {
                selected = true;
              }
              return (
                <StyledListItem selected={selected}>
                  {selected ? (
                    <span>{item.name}</span>
                  ) : (
                    <FilterLink
                      {...querys}
                      sort={item.value}
                      order={item.order}
                      name={item.name}
                      handleClick={handleClick}
                    />
                  )}
                </StyledListItem>
              );
            }}
          />
        </Col>
        <Col span={18}>
          <RepoTitle>{search.repos.total_count} items</RepoTitle>
          {search.err ? (
            <p>網路請求過多</p>
          ) : search.isFetching ? (
            <LoadingContainer>
              <Spin />
            </LoadingContainer>
          ) : (
            search.repos.items.map((repo: RepoItem) => (
              <Repo repo={repo} key={repo.id} />
            ))
          )}
          {search.isFetching ? null : (
            <PaginationContainer>
              <div className="pagination">
                <Pagination
                  pageSize={per_page}
                  current={Number(page) || 1}
                  total={
                    search.repos.total_count > 1000
                      ? 1000
                      : search.repos.total_count
                  }
                  onChange={noop}
                  itemRender={(page, type, ol) => {
                    const p =
                      type === 'page'
                        ? page
                        : type === 'prev'
                        ? page - 1
                        : page + 1;
                    const name = type === 'page' ? page : ol;
                    return (
                      <FilterLink
                        {...querys}
                        page={p}
                        name={name}
                        handleClick={handleClick}
                      />
                    );
                  }}
                />
              </div>
            </PaginationContainer>
          )}
        </Col>
      </Row>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px 0;
`;

const ListHeader = styled.span`
  font-weight: 800;
  font-size: 16px;
`;

interface ListProps {
  selected: boolean;
}

const StyledListItem = styled(List.Item)`
  border-left: ${(props: ListProps) =>
    props.selected ? '2px solid #e36209' : ''};
  font-weight: ${(props: ListProps) => (props.selected ? '100' : '')};
`;

const MarginBtnList = styled(List)`
  margin-bottom: 20px;
`;

const RepoTitle = styled.h3`
  border-bottom: 1px solid #eee;
  font-size: 24px;
  line-height: 50px;
`;

const PaginationContainer = styled.div`
  padding: 20px;
  text-align: center;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;

Search.getInitialProps = async ({ ctx, reduxStore }: any) => {
  const { query, sort, lang, order, page } = ctx.query;
  const store = reduxStore.getState();
  const { search } = store;
  const searchingReposAction = bindActionCreators(
    searchingRepos,
    reduxStore.dispatch,
  );
  let queryString = `?q=${query}`;
  if (lang) queryString += `+language:${lang}`;
  if (sort) queryString += `&sort=${sort}&order=${order || 'desc'}`;
  if (page) queryString += `&page=${page}`;

  queryString += `&per_page=${per_page}`;
  if (isServer && search.repos.items.length === 0) {
    await searchingReposAction(queryString);
  }

  return {};
};

const mapStateToProps = (state: ReducersState) => {
  return {
    search: state.search,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    searchingRepos: bindActionCreators(searchingRepos, dispatch),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Search),
);
