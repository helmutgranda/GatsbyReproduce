/*
 * Package Import
 */
import React, { Fragment } from 'react';
import { Link } from 'gatsby';

/*
 * Local Import
 */

/*
 * Component
 */
export default class Header extends React.Component {
  /*
   * State
   */
  state = {
    subMenu: null,

    // Burger menu
    open: false,
    onPhone: false,
  };

  /*
   * LifeCycles
   */
  componentDidMount() {
    window.addEventListener('resize', this.onPhone);
    setTimeout(this.onPhone);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onPhone);
  }

  /*
   * Actions
   */
  showMenu = () => {
    this.setState({ open: true });
  };

  hideMenu = () => {
    this.setState({ open: false });
  };

  /*
   * Handlers
   */
  onPhone = () => {
    this.setState({ onPhone: window.innerWidth < 900 });
  };

  onHover = menu => () => {
    this.setState({ subMenu: menu });
  };

  /*
   * Render
   */
  render() {
    const { onPhone, open, subMenu } = this.state;

    return <Fragment>Header</Fragment>;
  }
}
