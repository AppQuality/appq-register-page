import { Text } from "@appquality/appquality-design-system";
import React from "react";
import styled from "styled-components";

const GenericCard = ({
  icon,
  title,
  children,
  className,
}: {
  icon: React.ReactElement;
  title: string;
  children: React.ReactElement;
  className?: string;
}) => {
  return (
    <div className={className}>
      <div className="icon aq-my-2">{icon}</div>
      <div className="title aq-mb-2">{title}</div>
      <Text className="content">{children}</Text>
    </div>
  );
};

export default styled(GenericCard)`
  background: #611784;
  color: #fff;
  opacity: 0.8;
  border-radius: 32px;
  padding: 32px 16px;
  .icon,
  .title,
  .content {
    text-align: center;
  }
  .icon svg {
    font-size: 500%;
  }
  .title {
    font-weight: bold;
    font-size: 18px;
  }
  @media (max-width: ${({ theme }) => theme.grid.breakpoints.lg}) {
    .content {
      margin-bottom: 40px;
    }
  }
`;
