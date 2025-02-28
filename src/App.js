import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
      // Tự động chọn câu trả lời khi hết thời gian
      selectRandomAnswer();
    }
    return () => clearTimeout(timer);
  }, [countdown, isCountdownActive]);

  // Hàm chọn câu trả lời ngẫu nhiên và lưu lịch sử
  const selectRandomAnswer = () => {
    const randomIndex = Math.floor(Math.random() * sampleAnswers.length);
    const selectedAnswer = sampleAnswers[randomIndex];

    // Dừng đếm ngược
    setIsCountdownActive(false);

    // Chọn câu trả lời
    setAnswer(selectedAnswer);

    // Lưu lại câu hỏi và câu trả lời
    const historyItem = {
      question: question || "Câu hỏi không ghi lại",
      answer: selectedAnswer,
      date: new Date().toLocaleString(),
    };

    // Lưu vào localStorage
    try {
      const history = JSON.parse(localStorage.getItem('cardHistory') || '[]');
      history.push(historyItem);
      localStorage.setItem('cardHistory', JSON.stringify(history.slice(-20)));
    } catch (e) {
      console.log('Không thể lưu lịch sử');
    }

    // Chuyển sang bước hiển thị câu trả lời
    setStep('answer');
  };

  // Hàm gửi dữ liệu đến Google Sheets
  const sendToGoogleSheet = async (data) => {
    try {
      const response = await fetch(
        'https://script.google.com/macros/s/AKfycbx6wyQfFUyWdYhov38ihSUz8wgs6Fn1QrndeKUV2oHsrhcjveXtDT8EwbqBQrWKZHC6/exec',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );
  
      const result = await response.json();
      console.log('Đã gửi dữ liệu thành công', result);
    } catch (error) {
      console.error('Lỗi khi gửi dữ liệu:', error);
    }
  };

  // Hàm xử lý phản hồi
  const handleFeedback = (type) => {
    setFeedback(type);

    const sheetData = {
      question: question || "Không có câu hỏi",
      answer: answer,
      feedback: type,
      feedbackText: feedbackText,
    };

    // Gửi dữ liệu đến Google Sheet
    sendToGoogleSheet(sheetData);

    // Lưu phản hồi vào localStorage
    try {
      const feedbackData = {
        question: question || "Không có câu hỏi",
        answer: answer,
        feedbackType: type,
        feedbackText: feedbackText,
        timestamp: new Date().toISOString(),
      };

      const allFeedback = JSON.parse(localStorage.getItem('feedbackData') || '[]');
      allFeedback.push(feedbackData);
      localStorage.setItem('feedbackData', JSON.stringify(allFeedback));

      alert('Cảm ơn bạn đã gửi phản hồi!');

      // Reset phản hồi
      setFeedbackText('');
    } catch (e) {
      console.error('Không thể lưu phản hồi', e);
    }
  };

  // Hàm reset ứng dụng
  const restart = () => {
    setStep('intro');
    setQuestion('');
    setCountdown(15);
    setAnswer('');
    setIsCountdownActive(false);
    setFeedback('');
    setFeedbackText('');
  };

  // Render các bước
  const renderStep = () => {
    switch (step) {
      case 'intro':
        return (
          <div className="card">
            <h1 className="title">Ứng Dụng Rút Bài Ngẫu Nhiên</h1>
            <div className="instruction-box">
              <h2 className="subtitle">Hướng dẫn sử dụng:</h2>
              <ol className="instruction-list">
                <li>1. Dành 10 đến 15 giây tập trung vào câu hỏi của bạn. Các câu hỏi nên là những câu hỏi đóng.</li>
                <li>2. Sau khi đếm ngược kết thúc, một lá bài ngẫu nhiên sẽ xuất hiện với câu trả lời dành cho bạn.</li>
                <li>3. Lặp lại quá trình này cho những câu hỏi tiếp theo.</li>
              </ol>
            </div>
            <button className="button" onClick={() => setStep('question')}>
              Bắt Đầu
            </button>
          </div>
        );

      case 'question':
        return (
          <div className="card">
            <h2 className="subtitle">Nghĩ về câu hỏi của bạn</h2>
            <div className="input-container">
              <textarea
                className="input-field"
                placeholder="Nhập câu hỏi của bạn ở đây (không bắt buộc)..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
              <p className="hint-text">Gợi ý: Hãy đặt câu hỏi có thể trả lời bằng Có/Không hoặc câu trả lời ngắn gọn.</p>
            </div>
            <button
              className="button"
              onClick={() => {
                setIsCountdownActive(true);
                setStep('countdown');
              }}
            >
              Tiếp Tục
            </button>
          </div>
        );

      case 'countdown':
        return (
          <div className="card">
            <h2 className="subtitle">Hãy tập trung vào câu hỏi của bạn</h2>
            <div className="countdown-container">
              <div className="countdown-circle">
                <span className="countdown-number">{countdown}</span>
              </div>
              <p className="countdown-text">Giây còn lại</p>
            </div>
            {question && (
              <div className="question-display">
                <p className="question-text">"{question}"</p>
              </div>
            )}
            <button className="button secondary" onClick={selectRandomAnswer}>
              Bỏ qua đếm ngược
            </button>
            <div className="message-box">
              <p className="mystical-text">✧ Hãy thả lỏng và tin tưởng vào năng lượng vũ trụ ✧</p>
            </div>
          </div>
        );

      case 'answer':
        return (
          <div className="card">
            <h2 className="subtitle">Câu trả lời của bạn</h2>
            {question && (
              <div className="question-display">
                <p className="label">Câu hỏi:</p>
                <p className="question-text">"{question}"</p>
              </div>
            )}
            <div className="answer-card">
              <div className="answer-text">
                <p>{answer}</p>
              </div>
            </div>
            <div className="feedback-container">
              <p className="feedback-title">Câu trả lời này giúp bạn thế nào?</p>
              <div className="feedback-buttons">
                <button
                  className={`feedback-button ${feedback === 'hữu ích' ? 'active useful' : 'useful'}`}
                  onClick={() => handleFeedback('hữu ích')}
                >
                  Rất hữu ích
                </button>
                <button
                  className={`feedback-button ${feedback === 'dễ hiểu' ? 'active understand' : 'understand'}`}
                  onClick={() => handleFeedback('dễ hiểu')}
                >
                  Dễ hiểu
                </button>
                <button
                  className={`feedback-button ${feedback === 'khó hiểu' ? 'active difficult' : 'difficult'}`}
                  onClick={() => handleFeedback('khó hiểu')}
                >
                  Khó hiểu
                </button>
              </div>
              <div className="feedback-input">
                <textarea
                  className="input-field"
                  placeholder="Bạn có thể hành động dựa trên câu trả lời này không? (tùy chọn)"
                  rows="3"
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="action-buttons">
              <button className="icon-button">
                <Share2 size={16} />
                <span>Chia sẻ</span>
              </button>
              <button className="icon-button">
                <Heart size={16} />
                <span>Lưu</span>
              </button>
            </div>
            <button className="button" onClick={restart}>
              <RefreshCw size={16} className="icon" />
              Đặt câu hỏi mới
            </button>
            <div className="message-box">
              <p className="mystical-text">✧ Vũ trụ đã gửi thông điệp cho bạn ✧</p>
            </div>
          </div>
        );

      default:
        return <div>Đã xảy ra lỗi</div>;
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="header-title">Rút Bài Ngẫu Nhiên</h1>
        <div className="header-buttons">
          <button className="icon-button">
            <HelpCircle size={20} />
          </button>
          <button className="icon-button">
            <Settings size={20} />
          </button>
        </div>
      </header>
      <main className="main-content">{renderStep()}</main>
      <footer className="app-footer">© 2025 Ứng Dụng Rút Bài Ngẫu Nhiên</footer>
    </div>
  );
};

export default RandomCardApp;
