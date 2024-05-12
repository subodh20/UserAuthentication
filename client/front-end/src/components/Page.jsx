import classes from "./Page.module.scss";
export default function Page({ children }) {
  return <div className={classes.Page}>{children}</div>;
}
