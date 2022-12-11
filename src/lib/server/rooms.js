// this is the room state of our application

const rooms = [
  { name: 'Matys',   sensor: '0xFF01', power: '0',  tempTarget: 12,  tempCurrent: 10,  },
  { name: 'Palier',  sensor: '0x7801', power: '0',  tempTarget: 12,  tempCurrent: 10,  },
  { name: 'SdBainH', sensor: '0xE001', power: '0',  tempTarget: 12,  tempCurrent: 10,  },
  { name: 'Lili',    sensor: '0x3D01', power: '0',  tempTarget: 12,  tempCurrent: 10,  },
  { name: 'Cuisine', sensor: '0xD101', power: '0',  tempTarget: 12,  tempCurrent: 10,  },
  { name: 'Salon',   sensor: '0xB002', power: '0',  tempTarget: 12,  tempCurrent: 10,  },
  { name: 'SdBain',  sensor: '0xFE01', power: '0',  tempTarget: 12,  tempCurrent: 10,  },
  { name: 'Chambre', sensor: '0xA00E', power: '0',  tempTarget: 12,  tempCurrent: 10,  },
  { name: 'Mag',     sensor: '',       power: '0',  tempTarget: 18,  tempCurrent: 10,  },
  { name: 'Stef',    sensor: '0x9101', power: '0',  tempTarget: 15,  tempCurrent: 10,  },
]

// '0x200E': { name: 'Cellier' },
// '0xC00E': { name: 'Dehors ' },


export default rooms
