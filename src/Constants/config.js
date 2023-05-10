
export const api_url = 'https://v2-api.primedpharmacy.com/api'
export const titleOptions = [
  {text: 'Dr', value: 'Dr'},
  {text: 'Miss', value: 'Miss'},
  {text: 'Mr ', value: 'Mr'},
  {text: 'Mrs', value: 'Mrs'},
  {text: 'Sir', value: 'Sir'},
  {text: 'Ms', value: 'MS'}
]

export const statusWithColors = [
  {text: 'draft', color: 'rgb(36 162 175)'},
  {text: 'waiting for primed approval', color: 'warning'},
  {text: 'waiting for rx approval', color: '#6558F5'},
  {text: 'approved', color: 'primary'},
  {text: 'active', color: 'primary'},
  {text: 'new', color: '#0d6efd'},
  {text: 'pending', color: '#0d6efd'},
  {text: 'blocked', color: 'danger'},
  {text: 'shipped', color: 'primary'},
  {text: 'verified', color: 'primary'},
  {text: 'not verified', color: 'danger'},
  {text: 'accepted & waiting for primed approval', color: 'warning'},
  {text: 'approved by primed', color: 'primary'},
  {text: 'dispatched', color: 'primary'},
  {text: 'cancelled', color: 'danger'},
  {text: 'held', color: 'warning'},
  { text: 'shipped by primed', color: 'success' },
  { text: 'paid', color: 'primary' },
   {text:'sent',color:'success'}
]

export const payment_status = [
  {text: 'Draft', value: 'draft'},
  {text: 'Sent', value: 'sent'},
  {text: 'Paid', value: 'paid'}
]
