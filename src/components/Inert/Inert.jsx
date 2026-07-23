import React, { useRef, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * Marks the component's children as unfocusable and unclickable as a whole subtree,
 * while a modal/dialog is open above them. This replaces having to prop-drill
 * 'isModalOpen' into every individual interactive element in the whole subtree to
 * be disabled one by one.
 * This fix is needed because, MUI v3's Dialog/Modal only sets 'aria-hidden="true"'
 * on the background siblings which doesn't remove them from the tab-order. Therefore,
 * SiteImprove flags these interactive child elements underneath the Dialog/Modal being
 * present in the page's tab-order when they should be hidden.
 */
function Inert({ active, children }) {
  const nodeRef = useRef();

  /* React 16 doesn't recognize 'inert' as a valid HTML attribute, therefore to safely
  implement 'inert' use a React ref on the HTML element. */
  useLayoutEffect(() => {
    if (nodeRef.current) {
      nodeRef.current.inert = active;
    }
  }, [active]);

  return (
    <div ref={nodeRef}>
      {children}
    </div>
  );
}

Inert.propTypes = {
  /** When true, whole child subtree becomes unfocusable and unclickable */
  active: PropTypes.bool.isRequired,
  /** Children subtree wrapped by the component */
  children: PropTypes.node,
};

export default Inert;
