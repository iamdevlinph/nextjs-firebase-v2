import React from 'react';
import Link from 'next/link';

const NavbarComponent = () => {
  return (
    <>
      <div>
        <Link href="/">
          <a>Index Page</a>
        </Link>
      </div>

      <div>
        <Link href="/about">
          <a>About Page</a>
        </Link>
      </div>

      <div>
        <Link href="/abc" as="/abc">
          <a>Custom Link Page</a>
        </Link>
      </div>
    </>
  );
};

export default NavbarComponent;
