function getFecha() {
  const fecha = new Date();
  const map = {
      dd: fecha.getDate(),
      mm: fecha.getMonth() + 1,
      yyyy: fecha.getFullYear()
  }

  return 'yyyy/mm/dd'.replace(/yyyy|mm|dd/gi, matched => map[matched])
}

export default getFecha;
