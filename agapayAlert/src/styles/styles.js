// styles/styles.js
import tw from 'twrnc';

export const colors = {
  primary: "#050C9C",
  secondary: "#F1FBFF"
};

const styles = {
  buttonPrimary: tw`bg-[#050C9C] text-white py-3 px-6  w-3/4 m-2 border border-[#8BACB8]`,
  buttonSecondary: tw`bg-[#F1FBFF] text-[#050C9C] py-3 px-6  w-3/4 m-2 border border-[#8BACB8]`,
  buttonContent: tw`flex-row items-center justify-center`, 
  container: tw`flex-1 justify-center items-center bg-[#050C9C]`,
  text: tw`text-lg font-bold`,
  textWhite: tw`text-white font-semibold text-center`,
  textPrimary: tw`text-[#050C9C] font-semibold text-center`,
  icon: tw`w-70 h-70`, 
  form: tw`w-full flex-1 bg-[#F1FBFF] items-center pt-10 `,
  form2: tw`w-full  bg-[#F1FBFF] items-center p-5 `,
  input: tw`py-2 px-4   w-3/4 m-1 border border-[#8BACB8]`,
  textform: tw`text-left w-full ml-25 font-semibold`,
  verificationInput: tw`border-2  border-[#8BACB8] text-center w-15 h-15 font-bold p-2 m-2`,
  errorText: tw`ml-25 w-full text-red-500 text-sm`,
  submenuItem: tw`p-5 text-[#007BFF]`,
  title: tw`text-3xl font-bold text-center`,
};

export default styles;