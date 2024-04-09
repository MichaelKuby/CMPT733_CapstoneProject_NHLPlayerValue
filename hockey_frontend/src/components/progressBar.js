function ProgressBar({ percent }) {
    // 根据百分比选择颜色
    const getColor = (percentage) => {
      if (percentage < 50) return 'red';
      if (percentage >= 50 && percentage < 80) return 'yellow';
      if (percentage >= 80) return 'green';
      return 'grey'; // 默认颜色
    };
  
    const ProgressBarContainer = {
        height: '30px',
        width: '120%',
        backgroundColor: '#ffffff', 
      border: '1px solid #ccc', // 细的灰边
    };
  
    const Filler = {
      height: '100%',
      width: `${percent > 100 ? 100 : percent}%`, // 处理超出100%的情况
      backgroundColor: getColor(percent),
      textAlign: 'right',
      transition: 'width 0.5s ease-in-out',
    };
  
    const Label = {
      padding: '5px',
      color: 'black', // 文字颜色为黑色
      fontWeight: 'lighter', // 文字细一点
    };
  
    return (
      <div style={ProgressBarContainer}>
        <div style={Filler}>
          <span style={Label}>{`${percent > 100 ? 100 : percent}%`}</span>
        </div>
      </div>
    );
  }
  
  export default ProgressBar;
  