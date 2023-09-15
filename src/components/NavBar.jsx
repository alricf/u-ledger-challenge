import Link from "next/link";

export default function NavBar({ patient }) {
  return (
    <>
      {patient ?
        <ul>
          <li>
            <Link href='/read'>
              READ
            </Link>
          </li>
        </ul>
        :
        <ul>
          <li>
            <Link href='/create'>
              CREATE
            </Link>
          </li>
          <li>
            <Link href='/read'>
              READ
            </Link>
          </li>
          <li>
            <Link href='/update'>
              UPDATE
            </Link>
          </li >
          <li>
            <Link href='/delete'>
              DELETE
            </Link>
          </li >
        </ul >
      }
    </>
  );
}