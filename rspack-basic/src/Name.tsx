import styled from "styled-components";

interface Props {
  name: string;
}

const Wrapper = styled.div`
  background-color: red;
`;

export const Name = ({ name }: Props) => {
  return (
    <>
      <Wrapper>
        <span>{name}</span>
      </Wrapper>
    </>
  );
};
