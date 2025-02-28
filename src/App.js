import React, { useState, useEffect } from 'react';
import { Clock, Share2, Heart, RefreshCw, HelpCircle, Settings, ThumbsUp, ThumbsDown } from 'lucide-react';

const RandomCardApp = () => {
  const [step, setStep] = useState('intro'); // intro, question, countdown, answer
  const [question, setQuestion] = useState('');
  const [countdown, setCountdown] = useState(15);
  const [answer, setAnswer] = useState('');
  const [isCountdownActive, setIsCountdownActive] = useState(false);
  const [isCardFlipping, setIsCardFlipping] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [feedbackText, setFeedbackText] = useState('');
  
  // Danh sách đầy đủ 173 câu trả lời
  const sampleAnswers = [
    "Hãy lắng nghe trái tim",
    "Trái tim hát ở đâu thì mình ở đó",
    "Quan tâm cái gì thì cái đó to ra",
    "Hãy bình an với cái mình đang có",
    "Chấp nhận điều xấu nhất có thể xảy ra",
    "Không có gì là mãi mãi",
    "Tình yêu thực sự không có tiêu chuẩn nào cả",
    "Có đáng làm hay không",
    "Sao phải làm?",
    "Muốn lười thì phải sâu sắc",
    "Nói lên sự thật bằng tình thương",
    "Đừng vội nói khi không có động cơ yêu thương",
    "Thua mà đúng còn hơn thắng mà sai",
    "Chuyện này đến để giúp bạn tăng trí tuệ",
    "Mọi việc đến để giúp bạn trưởng thành",
    "Kỳ diệu hơn mọi điều - Trái tim biết thương yêu",
    "Hãy thông cảm vì ai cũng làm điều mình cho là đúng nhất",
    "Đừng lo lắng, mọi thứ sẽ hiện ra đúng lúc",
    "Rộng mở tâm, đời sẽ rộng rãi thênh thang",
    "Đừng cố gắng chiến đấu để giành một thứ vô thường",
    "Mọi việc vận hành bởi nhân quả",
    "Đặt mình vào lịch sử của người khác và thông cảm cho họ",
    "Đừng phán xét khi chưa hiểu rõ câu chuyện",
    "Biết hài lòng nghĩa là biết hạnh phúc",
    "Muốn khổ thì hãy bám chặt vào",
    "Giúp người cũng là giúp mình",
    "Thông minh không bằng may mắn, may mắn không bằng biết hài lòng",
    "Chấp nhận người ấy đúng như họ là",
    "Chấp nhận nó như nó là",
    "Hãy làm khi có động cơ tốt",
    "Đừng làm khi có động cơ xấu",
    "Đừng quá sợ mất",
    "Cái tốt nhất bao giờ cũng đến khi bạn không còn kỳ vọng nữa",
    "Đừng nghĩ về bản thân quá nhiều",
    "Thong thả mà làm",
    "Đối xử tốt với chính mình",
    "Quan tâm đến điều giúp bạn hạnh phúc hơn",
    "Hãy cẩn thận với điều bạn muốn",
    "Đối diện để hiểu, hiểu rồi thì hết sợ",
    "Đời hết dở khi ta biết niềm nở",
    "Yêu thương chính mình đúng cách là quan trọng hơn",
    "Hãy nhận ra sự ban phước bí mật trong tình huống này",
    "Phần thưởng chỉ dành cho người dũng cảm",
    "Thành công chân thực bắt đầu từ động lực chân chính",
    "Mở trái tim bạn ra, cho nỗi sợ lùi xa",
    "Yêu thương là liều thuốc tốt nhất cho thân thể và tâm hồn",
    "Việc tí nữa chớ để bây giờ, việc ngày mai chớ để hôm nay",
    "Đừng mong muốn thế giới phải công bằng theo kiểu của bạn",
    "Với lòng tin thì không điều gì là không thể",
    "Hãy chọn bình an",
    "Hãy chọn cách nhìn dẫn bạn đến tự do và tận hưởng",
    "Hãy chọn tự do trong tâm hồn",
    "Chọn cái làm tổng hạnh phúc tăng lên",
    "Đừng phóng đại",
    "Đừng nghĩ quá nhiều",
    "Đừng vội vàng",
    "Nếu quan trọng, đừng trì hoãn",
    "Chấp nhận thử thách để trưởng thành",
    "Làm điều tốt nhất có thể, thay vì điều đúng nhất mà bạn không thể",
    "Thấy biết ơn rồi hãy làm",
    "Làm điều tốt mà không mong đợi đáp lại",
    "Hãy biết chăm sóc bản thân",
    "Tập trung vào giải pháp thay vì vấn đề",
    "Đừng lãng phí thời gian vào những việc vô nghĩa",
    "Đừng để sợ hãi ngăn cản bạn",
    "Đừng sống chỉ để làm hài lòng người khác",
    "Đừng để cảm xúc chi phối những quyết định quan trọng của bạn",
    "Kệ con gà nó đi",
    "Lo lắng về tương lai chỉ làm ta sai trong hiện tại",
    "Đừng lo lắng, tất cả chỉ là sự hoàn hảo đang dần hé lộ",
    "Làm gì không quan trọng bằng làm trong trạng thái nào",
    "Đừng quyết định trong tham lam, sợ hãi. Hãy quyết định trong bình an",
    "Bên ngoài siết chặt, bên trong thả lỏng",
    "Chấp nhận rằng điều gì cũng có thể xảy ra",
    "Chấp nhận xấu nhất trong tương lai, cố gắng tốt nhất trong hiện tại",
    "Bên ngoài cố gắng để thành công, bên trong hòa bình với thất bại",
    "Nếu bạn không tự làm khó chính mình thì mọi việc đều rất OK",
    "Ăn mừng đi!",
    "Nếu đủ duyên",
    "Đừng quan tâm quá khứ, hãy sống trong hiện tại",
    "Để xem!",
    "Việc gì phải xoắn",
    "Sống trong biết ơn thì ân sủng sẽ tới",
    "Hãy chúc thầm bí mật",
    "Mở rộng góc nhìn ra",
    "Bạn hãy chậm lại, vẫn còn nhiều cơ hội",
    "Suy ngẫm sâu sắc",
    "Không phán xét",
    "Nhìn bằng con mắt cảm thông",
    "Bảo vệ chính mình",
    "Tránh những người tiêu cực hoặc năng lượng tiêu cực",
    "Đừng dễ bị ảnh hưởng bởi bên ngoài",
    "Nhìn Mỗi Người Ta Gặp Như Một Vị Bồ Tát",
    "Hãy vun trồng yêu thương",
    "Hãy cảnh giác",
    "Đến nơi nào bạn cảm thấy muốn đi",
    "Hãy tiến lên nếu trái tim nói \"Có\"",
    "Nếu làm thì phải hiểu hậu quả",
    "Đừng ngần ngại",
    "Chữa lành cho các mối quan hệ",
    "Chấp nhận bằng tình thương",
    "Hãy chăm chỉ và tỉnh táo",
    "Làm điều tốt nhiều hơn cho đến khi thành tự nhiên",
    "Cầu nguyện",
    "Thấy ánh sáng trong hoàn cảnh thì mọi chuyện sẽ tốt đẹp",
    "Cách nhìn sáng, tạo ra thực tại sáng",
    "Lắng nghe câu trả lời sẵn có bên trong",
    "Đừng theo đuổi những thứ hào nhoáng bên ngoài",
    "Đừng nghĩ nhiều quá cho mình",
    "Quan tâm đến người khác",
    "Càng bớt tự giới hạn, càng hạnh phúc",
    "Dũng cảm thể hiện tình yêu",
    "Đừng tập trung vào cái không có vì sẽ luôn thấy thiếu thốn",
    "Dám là chính mình",
    "Dừng lại, kiểm tra động cơ trước khi hành động",
    "Cân nhắc đến kết quả cuối cùng đã rồi hãy làm",
    "Hãy trân trọng cơ hội bạn đang có",
    "Tập trung vào hành động, không tập trung vào kết quả",
    "Hành động với mục tiêu tạo ra hạnh phúc",
    "Hài lòng với cái bạn đang có và cả cái bạn không có",
    "Đừng bị ràng buộc bởi tiền bạc",
    "Thấy cả mặt sáng và tối của vấn đề",
    "Hãy làm vì người khác",
    "Đừng bắt mọi thứ theo chuẩn của mình",
    "Thấy cơ hội kể cả khi khó khăn",
    "Tận hưởng niềm vui trên con đường",
    "Hãy biết ơn dù chuyện gì xảy ra",
    "Tính nhưng không kỳ vọng",
    "Không hy vọng thì không sợ hãi",
    "Có đáng làm không?",
    "Rộng mở cho nhiều phương án khác nhau",
    "Tìm cách dễ mà làm",
    "Đỉnh cao của lòng tham là sự huỷ diệt",
    "Cái gì đến sẽ đến, cái gì không đến sẽ không đến",
    "Cố gắng trong bình an",
    "Đừng làm cho người khác ảo tưởng về bạn",
    "Hãy kiên nhẫn, rất nhiều việc được hoàn thành bởi sự chờ đợi",
    "Khi biết ơn, cả cách nhìn và cảm xúc sẽ thay đổi theo",
    "Bạn chính là chủ nhân của vấn đề",
    "Không để cảm xúc kiểm soát hành động, suy nghĩ của mình",
    "Dám đam mê, dám rực rỡ",
    "Lắng nghe người khác, chấp nhận những điều trái tai",
    "Thấy hạnh phúc đang sẵn ở đây",
    "Mọi điều ước đều sẽ thành sự thật",
    "Cẩn thận với điều bạn đang tin chắc",
    "Ngừng đuổi theo tham vọng",
    "Đừng bị ảnh hưởng bởi suy nghĩ của người khác",
    "Cố giữ cái gì thì bị phụ thuộc vào cái đấy",
    "Chấp nhận người khác hiểu lầm mình",
    "Dũng cảm làm điều đúng",
    "Tập trung vào cái đầy đủ sẵn có thì đời bạn sẽ đủ lên",
    "Tìm ra điểm mấu chốt",
    "Hành động quyết liệt khi cơ hội đến",
    "Có thực sự cần không?",
    "Làm điều phi thường nhỏ bé",
    "Điều tốt nhỏ cũng nên làm",
    "Điều xấu nhỏ cũng không làm",
    "Không gieo nhân thì không thể có quả",
    "Đừng kiểm soát những thứ không kiểm soát được",
    "Đừng cố kiểm soát quả, hãy cố gieo nhân lành",
    "Dù tốt thế nào vẫn sẽ có người coi bạn là ác quỷ",
    "Đừng ảo tưởng về chính mình",
    "Hãy xin lời khuyên từ người bạn tin tưởng",
    "Đôi khi phải chấp nhận thiệt về mình",
    "Đừng đổ lỗi",
    "Bạn có thể làm được!",
    "Hãy kiên định",
    "Cẩn thận nghiệp xấu sẽ đến",
    "Tin tốt sẽ đến dưới nhiều hình thức khác nhau",
    "Hãy biết ưu tiên",
    "Cho mình thêm một cơ hội",
    "Hãy ra khỏi cái xó của bạn",
    "Từ từ đã"
  ];

  // Xử lý đếm ngược
  useEffect(() => {
    let timer;
    if (isCountdownActive && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (isCountdownActive && countdown === 0) {
      setIsCountdownActive(false);
      
      // Thay vì chuyển đến bước chọn bài, chọn ngay lá bài ngẫu nhiên
      const randomIndex = Math.floor(Math.random() * sampleAnswers.length);
      setAnswer(sampleAnswers[randomIndex]);
      
      // Lưu lại câu hỏi và câu trả lời nếu có
      const historyItem = {
        question: question || "Câu hỏi không ghi lại",
        answer: sampleAnswers[randomIndex],
        date: new Date().toLocaleString()
      };
      
      // Lưu vào localStorage nếu môi trường cho phép
      try {
        const history = JSON.parse(localStorage.getItem('cardHistory') || '[]');
        history.push(historyItem);
        localStorage.setItem('cardHistory', JSON.stringify(history.slice(-20))); // Chỉ lưu 20 mục gần nhất
      } catch (e) {
        console.log('Không thể lưu lịch sử');
      }
      
      // Hiệu ứng lật bài trước khi hiển thị câu trả lời
      setIsCardFlipping(true);
      setTimeout(() => {
        setIsCardFlipping(false);
        setStep('answer');
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown, isCountdownActive]);

  // Xử lý khi chọn một lá bài
  const handleCardSelect = () => {
    setIsCardFlipping(true);
    
    // Chọn câu trả lời ngẫu nhiên
    const randomIndex = Math.floor(Math.random() * sampleAnswers.length);
    setAnswer(sampleAnswers[randomIndex]);
    
    // Lưu lại câu hỏi và câu trả lời nếu có
    const historyItem = {
      question: question || "Câu hỏi không ghi lại",
      answer: sampleAnswers[randomIndex],
      date: new Date().toLocaleString()
    };
    
    // Lưu vào localStorage nếu môi trường cho phép
    try {
      const history = JSON.parse(localStorage.getItem('cardHistory') || '[]');
      history.push(historyItem);
      localStorage.setItem('cardHistory', JSON.stringify(history.slice(-20))); // Chỉ lưu 20 mục gần nhất
    } catch (e) {
      console.log('Không thể lưu lịch sử');
    }
    
    // Hiệu ứng lật bài
    setTimeout(() => {
      setIsCardFlipping(false);
      setStep('answer');
    }, 1000);
  };

  // Xử lý phản hồi của người dùng
  const handleFeedback = (type) => {
    setFeedback(type);
    
    // Lưu phản hồi vào localStorage hoặc có thể gửi đến server
    try {
      const feedbackData = {
        question: question || "Không có câu hỏi",
        answer: answer,
        feedbackType: type,
        feedbackText: feedbackText,
        timestamp: new Date().toISOString()
      };
      
      // Lưu vào localStorage
      const allFeedback = JSON.parse(localStorage.getItem('feedbackData') || '[]');
      allFeedback.push(feedbackData);
      localStorage.setItem('feedbackData', JSON.stringify(allFeedback));
      
      // Thông báo thành công
      alert("Cảm ơn bạn đã gửi phản hồi!");
      
      // Reset phản hồi
      setFeedbackText('');
    } catch (e) {
      console.error("Không thể lưu phản hồi", e);
    }
  };
  
  // Xử lý khi khởi động lại
  const restart = () => {
    setStep('question');
    setQuestion('');
    setCountdown(15);
    setAnswer('');
    setFeedback('');
    setFeedbackText('');
  };

  // Render các màn hình khác nhau dựa vào bước hiện tại
  const renderStep = () => {
    switch (step) {
      case 'intro':
        return (
          <div className="flex flex-col items-center text-center p-6 space-y-6">
            <h1 className="text-2xl font-bold text-purple-700">Ứng Dụng Rút Bài Ngẫu Nhiên</h1>
            <div className="bg-purple-100 p-4 rounded-lg shadow">
              <h2 className="font-bold mb-2">Hướng dẫn sử dụng:</h2>
              <ol className="text-left space-y-2">
                <li className="mb-2">1. Dành 10 đến 15 giây tập trung vào câu hỏi của bạn. Các câu hỏi nên là những câu hỏi đóng.</li>
                <li className="mb-2">2. Sau khi đếm ngược kết thúc, một lá bài ngẫu nhiên sẽ xuất hiện với câu trả lời dành cho bạn.</li>
                <li>3. Lặp lại quá trình này cho những câu hỏi tiếp theo.</li>
              </ol>
            </div>
            <button 
              className="bg-purple-600 text-white py-3 px-6 rounded-lg shadow hover:bg-purple-700 transition-colors"
              onClick={() => setStep('question')}
            >
              Bắt Đầu
            </button>
          </div>
        );
        
      case 'question':
        return (
          <div className="flex flex-col items-center p-6 space-y-6 max-w-lg mx-auto">
            <h2 className="text-xl font-semibold text-purple-300">Nghĩ về câu hỏi của bạn</h2>
            <div className="w-full">
              <textarea
                className="w-full p-4 border border-purple-500 rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-purple-300 bg-indigo-900 bg-opacity-40 text-white placeholder-purple-300"
                placeholder="Nhập câu hỏi của bạn ở đây (không bắt buộc)..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
              <p className="text-sm text-purple-300 mt-2">Gợi ý: Hãy đặt câu hỏi có thể trả lời bằng Có/Không hoặc câu trả lời ngắn gọn.</p>
            </div>
            <button 
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-8 rounded-lg shadow-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105"
              onClick={() => {
                setIsCountdownActive(true);
                setStep('countdown');
              }}
            >
              Tiếp Tục
            </button>
            
            <div className="text-center max-w-md mt-4">
              <p className="text-yellow-300 text-xs mb-2">✧ Hãy để tâm trí bạn thật tĩnh lặng trước khi đặt câu hỏi ✧</p>
            </div>
          </div>
        );
        
      case 'countdown':
        return (
          <div className="flex flex-col items-center justify-center p-6 space-y-8">
            <h2 className="text-xl font-semibold text-purple-300">Hãy tập trung vào câu hỏi của bạn</h2>
            
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-indigo-800 to-purple-800 flex items-center justify-center border-4 border-purple-500 shadow-xl shadow-purple-900/30 relative">
                <span className="text-5xl font-bold text-white">{countdown}</span>
                <div className="absolute inset-0 rounded-full border-4 border-yellow-400 border-opacity-50 animate-ping"></div>
              </div>
              <p className="mt-4 text-purple-300">Giây còn lại</p>
            </div>
            
            {question && (
              <div className="bg-indigo-900 bg-opacity-50 p-4 rounded-lg max-w-sm border border-purple-700">
                <p className="italic text-gray-200">"{question}"</p>
              </div>
            )}
            
            <button 
              className="bg-indigo-700 text-gray-200 py-2 px-4 rounded hover:bg-indigo-800 transition-colors"
              onClick={() => {
                setIsCountdownActive(false);
                setStep('cards');
              }}
            >
              Bỏ qua đếm ngược
            </button>
            
            <div className="mt-4 text-center">
              <p className="text-yellow-400 text-xs">✧ Hãy thả lỏng và tin tưởng vào năng lượng vũ trụ ✧</p>
            </div>
          </div>
        );
        
      case 'cards':
        return (
          <div className="flex flex-col items-center p-6 space-y-6">
            <h2 className="text-xl font-semibold text-purple-300">Đang chọn lá bài ngẫu nhiên cho bạn...</h2>
            <div className="w-64 h-96 bg-gradient-to-br from-purple-700 to-indigo-900 rounded-lg shadow-lg shadow-purple-500/30 flex items-center justify-center relative">
              <div className="absolute inset-0 rounded-lg border-2 border-purple-500 opacity-70"></div>
              <div className="text-yellow-400 text-6xl opacity-80 animate-pulse">⋆</div>
              
              {/* Hiệu ứng hào quang */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-yellow-400 to-purple-600 opacity-30 blur-xl animate-pulse"></div>
              
              {/* Hiệu ứng các ngôi sao */}
              <div className="absolute top-1/4 left-1/4 text-yellow-400 animate-ping delay-100">✦</div>
              <div className="absolute top-3/4 right-1/4 text-yellow-400 animate-ping delay-300">✧</div>
              <div className="absolute bottom-1/4 left-1/3 text-yellow-400 animate-ping delay-500">✦</div>
              <div className="absolute top-1/2 right-1/3 text-yellow-400 animate-ping delay-700">✧</div>
            </div>
          </div>
        );
        
      case 'answer':
        return (
          <div className="flex flex-col items-center p-6 space-y-6">
            <h2 className="text-xl font-semibold text-purple-300">Câu trả lời của bạn</h2>
            
            {question && (
              <div className="bg-indigo-800 p-4 rounded-lg w-full max-w-md mb-2 border border-indigo-500">
                <p className="text-purple-200 font-medium">Câu hỏi:</p>
                <p className="italic text-white">"{question}"</p>
              </div>
            )}
            
            <div className="bg-gradient-to-br from-purple-700 to-indigo-800 border-2 border-purple-400 rounded-lg p-6 shadow-xl shadow-purple-900/30 w-full max-w-md relative overflow-hidden">
              {/* Hiệu ứng ánh sáng */}
              <div className="absolute -top-10 -right-10 w-20 h-20 bg-yellow-400 opacity-30 blur-xl"></div>
              <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-purple-400 opacity-20 blur-xl"></div>
              
              <div className="text-center relative z-10">
                <p className="text-lg font-medium text-yellow-100">{answer}</p>
              </div>
              
              {/* Hiệu ứng trang trí */}
              <div className="absolute top-2 left-2 text-yellow-400 text-xs">✧</div>
              <div className="absolute bottom-2 right-2 text-yellow-400 text-xs">✧</div>
            </div>
            
            {/* Hệ thống phản hồi */}
            <div className="w-full max-w-md bg-indigo-800 p-4 rounded-lg border border-indigo-500">
              <p className="text-white font-medium mb-3 text-center">Câu trả lời này giúp bạn thế nào?</p>
              
              <div className="flex justify-center space-x-4 mb-4">
                <button 
                  className={`px-4 py-2 rounded-lg transition-colors ${feedback === 'hữu ích' ? 'bg-green-600 text-white' : 'bg-green-800 hover:bg-green-700 text-white border border-green-600'}`}
                  onClick={() => handleFeedback('hữu ích')}
                >
                  Rất hữu ích
                </button>
                <button 
                  className={`px-4 py-2 rounded-lg transition-colors ${feedback === 'dễ hiểu' ? 'bg-blue-600 text-white' : 'bg-blue-800 hover:bg-blue-700 text-white border border-blue-600'}`}
                  onClick={() => handleFeedback('dễ hiểu')}
                >
                  Dễ hiểu
                </button>
                <button 
                  className={`px-4 py-2 rounded-lg transition-colors ${feedback === 'khó hiểu' ? 'bg-red-600 text-white' : 'bg-red-800 hover:bg-red-700 text-white border border-red-600'}`}
                  onClick={() => handleFeedback('khó hiểu')}
                >
                  Khó hiểu
                </button>
              </div>
              
              <div className="w-full">
                <textarea 
                  className="w-full p-3 border border-indigo-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-indigo-700 text-white placeholder-indigo-300"
                  placeholder="Bạn có thể hành động dựa trên câu trả lời này không? (tùy chọn)"
                  rows="3"
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                ></textarea>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <button className="flex items-center space-x-1 text-purple-300 hover:text-purple-100 transition-colors">
                <Share2 size={16} />
                <span>Chia sẻ</span>
              </button>
              <button className="flex items-center space-x-1 text-purple-300 hover:text-red-300 transition-colors">
                <Heart size={16} />
                <span>Lưu</span>
              </button>
            </div>
            
            <button 
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-6 rounded-lg shadow-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 flex items-center"
              onClick={restart}
            >
              <RefreshCw size={16} className="mr-2" />
              Đặt câu hỏi mới
            </button>
            
            <div className="mt-2 text-center">
              <p className="text-yellow-400 text-xs">✧ Vũ trụ đã gửi thông điệp cho bạn ✧</p>
            </div>
          </div>
        );
        
      default:
        return <div>Đã xảy ra lỗi</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex flex-col">
      {/* Header */}
      <header className="bg-black bg-opacity-50 backdrop-blur-sm shadow-lg p-4 flex justify-between items-center border-b border-purple-500">
        <h1 className="font-bold text-purple-300">Rút Bài Ngẫu Nhiên</h1>
        <div className="flex space-x-3">
          <button className="p-2 text-purple-300 hover:text-purple-100">
            <HelpCircle size={20} />
          </button>
          <button className="p-2 text-purple-300 hover:text-purple-100">
            <Settings size={20} />
          </button>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        {renderStep()}
      </main>
      
      {/* Footer */}
      <footer className="bg-black bg-opacity-60 border-t border-purple-800 p-3 text-center text-sm text-purple-300">
        © 2025 Ứng Dụng Rút Bài Ngẫu Nhiên
      </footer>
    </div>
  );
};

export default RandomCardApp;
