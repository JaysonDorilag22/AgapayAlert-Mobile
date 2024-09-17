// styles/styles.js
import tw from 'twrnc';

export const colors = {
  primary: "#050C9C",
  secondary: "#F1FBFF"
};

const styles = {
  buttonPrimary: tw`bg-[#050C9C] text-white py-3 px-6 rounded w-3/4 m-2 border border-[#8BACB8]`,
  buttonSecondary: tw`bg-[#F1FBFF] text-[#050C9C] py-3 px-6 rounded w-3/4 m-2 border border-[#8BACB8]`,
  buttonContent: tw`flex-row items-center justify-center`, // Add buttonContent styles
  container: tw`flex-1 justify-center items-center bg-[#050C9C]`,
  text: tw`text-lg font-bold`,
  textWhite: tw`text-white font-semibold text-center`,
  textPrimary: tw`text-[#050C9C] font-semibold text-center`,
  icon: tw`w-70 h-70`, // Add icon styles
};

export default styles;