import MainNavigation from './MainNavigation';
import classes from './Layout.module.css';

function Layout(props) {
  return (
    <div>
      <MainNavigation />
      <main className={classes.main}>{props.children}</main>
      <div className={classes.footer}>this is a footer</div>
    </div>
  );
}

export default Layout;
