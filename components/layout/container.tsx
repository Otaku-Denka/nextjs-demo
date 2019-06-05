import * as React from 'react';
import styled from 'styled-components';
interface ContainerProps {
  style?: object;
  children?: React.ReactNode;
}

const Container = ({ children, style }: ContainerProps) => {
  const styles = style;
  return React.cloneElement(
    <Wrapper style={{ ...styles }} />,
    {
      style: { ...styles },
    },
    children,
  );
};

export default Container;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  padding-left: 20px;
  padding-right: 20px;
  margin-left: auto;
  margin-right: auto;
`;
