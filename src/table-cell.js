
export default {
  functional: true,
  props: ['column', 'row', 'colspan'],
  render(createElement, { props }) {
    const column= props.column;
    const data = {};
    data.class = 'cell';
    if (column.$scopedSlots.default) {
      return createElement('div', data, column.$scopedSlots.default(props.row));
    }
    data.domProps = {};
    data.domProps.innerHTML = props.column.formatter(props.row[column.prop], props.row.data);
    return createElement('div', data);
  },
};
