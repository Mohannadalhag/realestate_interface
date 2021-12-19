import { BackgroundURL } from '../../constants/index';

const RootStyle = () => {
    const result = {
      root: {
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundImage: `url(${BackgroundURL})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: '50% 50%'
      },
      images: {
        maxWidth:'400px',
        borderRadius:'10px',
        maxHeight:'400px'
      },
      imgProfile:{
        width:'200px',
        height:'200px',
        margin:'10px 20px',
      },
      buttonUpload: {
        width:'200px',
        height:'200px',
      },
      SaveButton :{
        position: 'fixed',
        bottom: '90px',
        right: '50px'
      },
      ResetButton :{
        position: 'fixed',
        bottom: '155px',
        right: '50px'
      }
    };   
    return result;
}
export default RootStyle;