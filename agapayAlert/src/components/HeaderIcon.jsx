import React from 'react'
import icon1 from "../../assets/icon1.png";
import { Image } from 'react-native';
import tw from 'twrnc';

export default function HeaderIcon() {
  return (
    <Image source={icon1} style={tw`w-30 h-30`} />
  )
}
