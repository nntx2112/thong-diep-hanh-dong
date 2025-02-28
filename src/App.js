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
    // ... (giữ nguyên danh sách câu trả lời)
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
      const response = await axios.post(
        'https://script.google.com/macros/s/AKfycbx6wyQfFUyWdYhov38ihSUz8wgs6Fn1QrndeKUV2oHsrhcjveXtDT8EwbqBQrWKZHC6/exec',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Đã gửi dữ liệu thành công', response.data);
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
