# react-native-fullscreen-gallery

This package provides a gallery with as varieties of indicator animations at 60 fps

[See example app](https://github.com/vandetho/react-native-fullscreen-gallery-example)

## Installation

Use npm or yarn to install the library:


`npm i --save react-native-fullscreen-gallery`

or

`yarn add react-native-fullscreen-gallery`

## Props

Prop | Required | Description | Type | Default
------ | ------ | ------ | ------ | ------
`images` | <center>✔</center> | Your array of images | `array`️
`horizontal` |  | Scroll Orientation | `boolean` | `true`
`indicatorMode` |  | Indicator mode | `thumbnail` `dot` | `thumbnail`
`dotColor` |  | Indicator Color | `string` | `#FFFFFF`
`dotType` |  | Indicator animation type | `expand` `rotary` `fade` `liquid` | `expand`
`withZoom` |  | Only work with liquid animation for a zoom out effect | `boolean` | `false`
