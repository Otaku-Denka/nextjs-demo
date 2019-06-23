import { useCallback, useRef } from 'react';
import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';
import { NextFunctionComponent } from 'next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ReducersState } from '../../../redux/store';
import { searchUsers } from '../../../redux/actions/search';
import { SearchState } from '../../../redux/types/search';
import { UserItem } from '../../../redux/types/user';

const Option = Select.Option;

interface SearchUserProps {
  search: SearchState;
  value: string;
  searchUsers: (value: string, fetchId: number | string) => void;
  handleCreatorChange: (value: string) => void;
}

const SearchUser: NextFunctionComponent<any> = ({
  search,
  searchUsers,
  handleCreatorChange,
  value,
}: SearchUserProps) => {
  const handleValueOnChange = useCallback(
    (value: string) => handleCreatorChange(value),
    [],
  );
  const lastFetchIdRef = useRef(0);
  const handleFetchUsers = useCallback(
    debounce((value: string) => {
      lastFetchIdRef.current += 1;
      const fetchId = lastFetchIdRef.current;
      const query = `?q=${value}`;
      searchUsers(query, fetchId);
    }, 500),
    [],
  );
  return (
    <Select
      style={{ width: 200 }}
      showSearch={true}
      notFoundContent={
        search.isFetching ? <Spin size="small" /> : <span>nothing</span>
      }
      filterOption={false}
      placeholder="Creator"
      value={value}
      onChange={handleValueOnChange}
      onSearch={handleFetchUsers}
      allowClear={true}>
      {search.users.items.map((op: UserItem) => (
        <Option value={op.login} key={op.login}>
          {op.login}
        </Option>
      ))}
    </Select>
  );
};

const mapStateToProps = (state: ReducersState) => {
  return {
    search: state.search,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    searchUsers: bindActionCreators(searchUsers, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchUser);
