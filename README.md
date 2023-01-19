# Smart House

This smart house project is how I regulate my own house.

I've made it public so that anyone can build on it, and adapt it to its own needs.

## History

I've been trying to regulate my house temperature for a few years now and was mainly relying on Domoticz running on my Synology to do so. Unfortunately, I upgraded my Synology software to discover that Domoticz was not running on Synology DSM 7.

The usual way to run Domoticz on a Synology is now via a Docker image, but my Synology is too cheap to be able to run Docker.

So I rewrote this small app during Xmass holidays. It is independent of Domoticz and now run on some old Mac Mini.

## Setup

I have a few things:

First, a temperature / hydrometry sensor in each room. They all broadcast their measures via 433MHz domotic frequency. I have pluged an [USB RFXcom](http://www.rfxcom.com/epages/78165469.sf/en_GB/?ObjectPath=/Shops/78165469/Categories/Transceivers) on my Mac so that I can receive and send 433MHz signals.

Second, I have a bunch of [Nedis Smart Plugs](https://nedis.com/en-us/product/security-safety/smart-home/power/550703155/smartlife-smart-plug-wi-fi-power-meter-3680-w-france-typ-e-cee-76-10-40-0c-android-ios-white).

Third, I also have a bunch of DIO relay switches (I cannot find references anymore as all these seem to switch from 433MHz to wifi).

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

Then I also got a [DIO 16 channel remote control](https://www.leroymerlin.fr/produits/electricite-domotique/domotique-et-objets-connectes/domotique/solutions-de-commande/telecommande-16-canaux-dio-69231855.html) so that I also can switch my relay switches by hand in case my Mac Mini is down or my app as crashed.

## How it works

Sensors send their temperatures via 433MHz. The signals are received by the RFXcom on my Mac. Then the app sends back orders either via 433MHz for the heaters that have a DIO relay switch, or via Tuya cloud API calls for the heaters that are plugged on a Nedis Smart Plug.

Then there is a small web interface powered by [SvelteKit](https://kit.svelte.dev/) that displays temperatures, and allow us to program temperatures that should be set by user / activity / room. All this is stored on a Postgres database. You don't need to install Postgres, just run the docker-compose.yml and it will download and run the Postgres docker image for you.


## RFXcom

Some interesting article on testing RFXcom on Mac: [Test du RFXCOM Rfxtrx433e](https://rpidomotique.wordpress.com/2016/01/19/test-du-rfxcom-rfxtrx433e/)

The [Virtual Communication Serial Port driver](https://ftdichip.com/drivers/vcp-drivers/) probably needed so that the USB plug where you put the RFXcom is emulated into a serial port.


## Some command

Launch the web interface in dev mode so that it can still be accessed by other computers on port 3001.

```npm run dev -- --host --port 3001```


## Cons, issues, ...

1. Tuya cloud is a pain to access and configure. If you live in France, please remember that they put us on their Central Europe data center (and not wester Europe as you would has imagined).
1. The RFXcom npm package is very good but if you have some unusual hardware, it can be very difficult to find which code to exactly send.
1. I never managed to pair my Velux windows so I cannot pilot the automatic curtains.
1. Tuya temperature sensors are cheap but they don't work with the Tuya API because they don't stay connected inbetween temp sending.


## Codes for DIO switches

Just so that I remember which heater is associated with which button:

| Bottom Selector | Button  | Code | Hardware      |
| :---:           | :----:  | ---: | :---          |
| D               | 1       |  13  | Bathroom vent |
| D               | 2       |  14  | Heater Palier Reversed |




