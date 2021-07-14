import React from 'react';
import {Footer, Container, Content } from 'react-bulma-components';

export default function Foot() {
  return (
    <>
      <Footer>
        <Container>
          <Content style={{ textAlign: 'center' }}>
            <h2> Made with <span color='link'> ❤</span> by Carson, Carrie, and Brigid</h2>
            <p>
              The source code is licensed
              <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The
              website content is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
                CC BY NC SA 4.0
              </a>.
            </p>
          </Content>
        </Container>
      </Footer>
      </>
  );
}







