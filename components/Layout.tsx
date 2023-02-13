import React from 'react';
//import { Html, Head, Main, NextScript } from "next/document";

// const Layout = (props: any) => {
//     return (
//         <>
//         <Html>
//             <Head>
                // <link href="/docs/4.5/dist/css/bootstrap.min.css" 
                // rel="stylesheet" 
                // integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" 
                // crossOrigin="anonymous"/>
//             </Head>
//             <div className="container">
//                 {props.children}
//             </div>
//         </Html>

//         </>

//     );
// };

// export default Layout;

import Document, { Html, Head, Main, NextScript } from "next/document";

class Layout extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
        <link href="/docs/4.5/dist/css/bootstrap.min.css" 
                rel="stylesheet" 
                integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" 
                crossOrigin="anonymous"/>
        </Head>
            <div className="container">
                {props.children}
             </div>
        {/* <body>
          <Main />
          <NextScript />
        </body> */}
      </Html>
    );
  }
}

export default Layout;