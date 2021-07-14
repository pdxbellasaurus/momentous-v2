import React from 'react';
import { Link } from 'react-router-dom';
import {
  Columns,
  Card,
  Media,
  Heading,
  Content
} from 'react-bulma-components';

export function List({ children }) {
  return <Columns  >{children}</Columns>;
}

export function Event({ index, title, description, id }) {
  return (
    <Columns.Column
        size={3}>
      <Card key={index}>
        <Card.Content>
          <Media>
            <Media.Item>
              <Heading size={4}>
                <Link to={'/events/' + id}>{title}</Link>
              </Heading>             
            </Media.Item>
          </Media>
          <Content>
            {description}
            <br />
          </Content>
          <Link to={'/events/' + id}>RSVP</Link>
        </Card.Content>
      </Card>
    </Columns.Column>
  );
}
