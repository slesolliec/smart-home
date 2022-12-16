// this is the room state of our application

const rooms = [
  { name: 'Matys',   sensor: '0xFF01', power: '0', switchOn: false, isSwitch: true,  tempTarget: 12,  tempCurrent: 10,  tuyaId: 'bfb7fd9135eb2dd73egztw' },
  { name: 'Palier',  sensor: '0x7801', power: '0', switchOn: false, isSwitch: false, tempTarget: 12,  tempCurrent: 10,  tuyaId: '' },
  { name: 'SdBainH', sensor: '0xE001', power: '0', switchOn: false, isSwitch: false, tempTarget: 12,  tempCurrent: 10,  tuyaId: '' },
  { name: 'Lili',    sensor: '0x3D01', power: '0', switchOn: false, isSwitch: false, tempTarget: 12,  tempCurrent: 10,  tuyaId: '' },
  { name: 'Cuisine', sensor: '0xD101', power: '0', switchOn: false, isSwitch: true,  tempTarget: 12,  tempCurrent: 10,  tuyaId: 'bf7d504a06f0e24223ezr3' },
  { name: 'Salon',   sensor: '0xB002', power: '0', switchOn: false, isSwitch: false, tempTarget: 12,  tempCurrent: 10,  tuyaId: '' },
  { name: 'SdBain',  sensor: '0xFE01', power: '0', switchOn: false, isSwitch: true,  tempTarget: 12,  tempCurrent: 10,  tuyaId: 'bf127e02e7ea1f91bcjehc' },
  { name: 'Chambre', sensor: '0xA00E', power: '0', switchOn: false, isSwitch: false, tempTarget: 12,  tempCurrent: 10,  tuyaId: '' },
  { name: 'Mag',     sensor: '',       power: '0', switchOn: false, isSwitch: false, tempTarget: 5,   tempCurrent: 10,  tuyaId: '' },  // 'bf62c42f1b30f7540boel6'
  { name: 'Stef',    sensor: '0x9101', power: '0', switchOn: false, isSwitch: false, tempTarget: 5,   tempCurrent: 10,  tuyaId: 'bf07ef88e08e910889gv2l' },
]

// '0x200E': { name: 'Cellier' },
// '0xC00E': { name: 'Dehors ' },


export default rooms
