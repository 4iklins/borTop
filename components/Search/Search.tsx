import { SearchProps } from "./Search.props";
import styles from "./Search.module.css";
import cn from "classnames";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import  SearchIcon from "./search.svg";
import { KeyboardEvent, useState } from "react";
import { useRouter } from "next/router";

export const Search = ({className, ...props }: SearchProps): JSX.Element => {
  const [search, setSearch] = useState<string>('');
  const router = useRouter();
  const goToSearch = ()=> {
    router.push({
      pathname: '/search',
      query: {
        q: search
      }
    });
  };
  const handleEnterDown = (e:KeyboardEvent) => {
    if(e && e.key == 'Enter') goToSearch();
  };

  return (
    <div className={cn(styles.search, className)} {...props}>
      <Input placeholder="Поиск..."
        value={search}
        onChange={(e)=> setSearch(e.target.value)}
        onKeyDown={handleEnterDown}
        className={styles.searchInput}
      />
      <Button color="primary" onClick={goToSearch} className={styles.searchButton}>
        <SearchIcon/>
      </Button>
    </div>
  );
};