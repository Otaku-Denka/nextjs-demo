import Link from 'next/link';
import styled from 'styled-components';

const Test: React.FunctionComponent = () => {
  return (
    <div>
      this is test page
      <div>
        <Link href="/">
          <span>Link to Homepage</span>
        </Link>
      </div>
      <CustomStyledComponent>this is styled component</CustomStyledComponent>
    </div>
  );
};
export default Test;

const CustomStyledComponent = styled.div`
  font-size: 26px;
  font-weight: bold;
  color: green;
`;
