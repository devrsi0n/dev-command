export default {
  container: {
    backgroundColor: '#FFFFFF',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '24 32 24 0',
    marginLeft: '32',
    borderBottom: '1 solid #E6E7EB',
  },
  formItemWrap: { display: 'flex', flexDirection: 'column' },
  label: { width: '200', fontSize: '32' },
  contorl: {
    flex: '1',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  placeholder: { color: '#cccccc', fontSize: '28' },
  input: { flex: '1', fontSize: '28' },
  inputRead: { color: '#999999' },
  inputEdit: {},
  valueText: { fontSize: '28', flex: '1', paddingLeft: '20' },
  error: {
    backgroundColor: '#FFFFFF',
    color: 'red',
    fontSize: '24',
    padding: '20 40',
    borderBottom: '1px solid red',
  },
  _test: { display: 'flex' },
};