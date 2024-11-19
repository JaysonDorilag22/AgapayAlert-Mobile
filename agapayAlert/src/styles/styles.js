import tw from 'twrnc';

export const colors = {
  primary: "#050C9C",
  secondary: "#F1FBFF"
};

const styles = {
  buttonPrimary: tw`bg-[#050C9C] text-white py-3 px-6 w-3/4 m-2 border border-[#8BACB8] rounded-sm`,
  buttonSecondary: tw`bg-[#F1FBFF] text-[#050C9C] py-3 px-6 w-3/4 m-2 border border-[#8BACB8] rounded-sm`,
  buttonContent: tw`flex-row items-center justify-center rounded-sm`, 
  buttonDanger: tw`bg-[#B8001F] text-white py-3 px-6 w-3/4 m-2 rounded-sm`,

  container: tw`flex-1 justify-center items-center bg-[#050C9C] rounded-sm`,
  text: tw`text-lg font-bold rounded-sm`,
  textWhite: tw`text-white font-semibold text-center rounded-sm`,
  textPrimary: tw`text-[#050C9C] font-semibold text-center rounded-sm`,
  icon: tw`w-70 h-70 rounded-sm`, 
  form: tw`w-full flex-1 bg-[#F1FBFF] items-center pt-10 rounded-sm`,
  form2: tw`w-full bg-[#F1FBFF] items-center p-5 rounded-sm`,
  input: tw`py-2 px-4 w-3/4 m-1 border border-[#8BACB8] rounded-sm`,
  textform: tw`text-left w-full ml-25 font-semibold rounded-sm`,
  verificationInput: tw`border-2 border-[#8BACB8] text-center w-15 h-15 font-bold p-2 m-2 rounded-sm`,
  errorText: tw`ml-25 w-full text-red-500 text-sm rounded-sm`,
  submenuItem: tw`p-5 text-[#007BFF] rounded-sm`,
  title: tw`text-3xl font-bold text-center rounded-sm`,
};

export default styles;