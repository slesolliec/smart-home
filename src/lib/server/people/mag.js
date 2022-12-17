
const mag = {
  name: 'Mag',
  teletravail: {
    name: 'Télétravail',
    color: 'orange',
    rooms: [
      { name: 'Chambre', hours: { '0h00': 15, '5h30': 17, '7h45': 12, '16h00': 15, '18h00': 17, '21h00': 15 }},
      { name: 'Cuisine', hours: { '5h30': 18, '7h45': 12, '11h30': 18, '13h45': 12, '16h00': 18, '21h00': 12 }},
      { name: 'Salon',   hours: { '6h30': 17, '7h45': 12, '16h30': 17, '21h00': 12 }},
      { name: 'SdBain',  hours: { '5h00': 16, '6h30': 18, '7h45': 12, '18h30': 17, '21h00': 12 }},
      { name: 'Mag',     hours: { '7h30': 20, '17h30': 5 }},
    ]
  },
  angers: {
    name: 'Angers',
    color: 'red',
    rooms: [
      { name: 'Chambre', hours: { '0h00': 15, '5h30': 17, '7h45': 12, '16h00': 15, '18h00': 17, '21h00': 15 }},
      { name: 'Cuisine', hours: { '5h30': 18, '7h45': 12, '16h00': 18, '21h00': 12 }},
      { name: 'Salon',   hours: { '6h30': 17, '7h45': 12, '16h30': 17, '21h00': 12 }},
      { name: 'SdBain',  hours: { '5h00': 16, '6h30': 18, '7h45': 12, '18h30': 17, '21h00': 12 }},
    ]
  },
  repos: {
    name: 'Repos',
    color: 'green',
    rooms: [
      { name: 'Chambre', hours: { '0h00': 15, '10h00': 17, '12h00': 15, '18h00': 18, '21h00': 15 }},
      { name: 'Cuisine', hours: { '7h00': 15, '9h00': 17, '18h00': 18, '21h00': 12 }},
      { name: 'Salon',   hours: { '7h00': 15, '9h00': 17, '18h00': 18, '21h00': 12 }},
      { name: 'SdBain',  hours: { '7h00': 15, '9h00': 17, '21h00': 15, '22h00': 13 }},
    ]
  },
}

export default mag