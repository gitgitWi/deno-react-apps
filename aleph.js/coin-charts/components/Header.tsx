import { Link } from 'aleph/react';

export default function Header() {
  return (
    <header className="sticky top-0 w-full h-12 bg-gray-300 border-white">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '90%',
          maxWidth: 900,
          height: '100%',
          margin: '0 auto',
        }}
      >
        <h1 className="font-bold">
          <Link style={{ fontSize: 16, color: '#333' }} to="/">
            Oui Coins
          </Link>
        </h1>
      </div>
    </header>
  );
}
