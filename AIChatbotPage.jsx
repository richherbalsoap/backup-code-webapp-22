
import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Helmet } from 'react-helmet-async';
import useAppStore from '@/store/appStore';

const AIChatbotPage = () => {
  const results = useAppStore(state => state.results);
  const students = useAppStore(state => state.students);

  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI assistant. Ask me about any student's marks, class performance, or school data. For example, type a student's name to see their results.",
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const findStudentResults = (query) => {
    const lowerQuery = query.toLowerCase().trim();

    if (lowerQuery === 'all students' || lowerQuery === 'list students') {
      if (students.length === 0) return "No students have been added yet. Add students from the Student Management page.";
      let response = `There are ${students.length} students registered:\n\n`;
      students.forEach(s => {
        response += `- ${s.name} (Class ${s.standard}-${s.section})\n`;
      });
      return response;
    }

    if (lowerQuery === 'all results' || lowerQuery === 'results summary') {
      if (results.length === 0) return "No results have been recorded yet. Add results from the Result Sender page.";
      let response = `There are ${results.length} result records:\n\n`;
      results.forEach(r => {
        response += `- ${r.studentName} (Class ${r.standard}-${r.section})`;
        if (r.subjects && r.subjects.length > 0) {
          const avg = Math.round(r.subjects.reduce((sum, s) => sum + parseInt(s.marks || 0), 0) / r.subjects.length);
          response += ` - Average: ${avg}%`;
        }
        response += '\n';
      });
      return response;
    }

    const matchingResults = results.filter(r =>
      r.studentName?.toLowerCase().includes(lowerQuery)
    );

    if (matchingResults.length > 0) {
      let response = '';
      matchingResults.forEach(result => {
        response += `Results for ${result.studentName} (Class ${result.standard}-${result.section}):\n`;
        if (result.subjects && result.subjects.length > 0) {
          result.subjects.forEach(sub => {
            response += `  - ${sub.name}: ${sub.marks}\n`;
          });
          const avg = Math.round(result.subjects.reduce((sum, s) => sum + parseInt(s.marks || 0), 0) / result.subjects.length);
          response += `  Average: ${avg}%\n`;
        } else {
          response += '  No subject marks recorded.\n';
        }
        response += '\n';
      });
      return response.trim();
    }

    const matchingStudent = students.find(s =>
      s.name?.toLowerCase().includes(lowerQuery)
    );

    if (matchingStudent) {
      return `Found student: ${matchingStudent.name} (Class ${matchingStudent.standard}-${matchingStudent.section})\nParent: ${matchingStudent.parentName}\nContact: ${matchingStudent.parentContact}\n\nNo result records found for this student yet. Add results from the Result Sender page.`;
    }

    return `Sorry, I couldn't find any student or results matching "${query}".\n\nTry:\n- Type a student's name to see their marks\n- Type "all students" to see all registered students\n- Type "all results" to see a summary of all results`;
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMessage]);
    const query = inputValue;
    setInputValue('');

    await new Promise(resolve => setTimeout(resolve, 300));

    const botResponse = findStudentResults(query);

    const botMessage = {
      id: messages.length + 2,
      text: botResponse,
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages(prevMessages => [...prevMessages, botMessage]);
  };

  return (
    <>
      <Helmet>
        <title>AI Insight Chatbot - EDULinker</title>
        <meta name="description" content="Get AI-powered insights and recommendations for school management" />
      </Helmet>
      <div className="space-y-6 relative z-10">
        <h1 className="text-3xl font-bold text-white text-center">AI Insight Chatbot</h1>

        <div
          className="bg-black/30 backdrop-blur-md border border-[#FFD700]/20 rounded-xl overflow-hidden flex flex-col max-w-4xl mx-auto"
          style={{ height: 'calc(100vh - 250px)', minHeight: '500px' }}
        >
          <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-3 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.sender === 'bot'
                      ? 'bg-[#FFD700]/20 border border-[#FFD700]/30'
                      : 'bg-white/10 border border-white/20'
                  }`}>
                    {message.sender === 'bot' ? (
                      <Bot size={18} className="text-[#FFD700]" />
                    ) : (
                      <User size={18} className="text-white" />
                    )}
                  </div>
                  <div>
                    <div className={`rounded-2xl px-4 py-3 ${
                      message.sender === 'bot'
                        ? 'bg-black/40 border border-[#FFD700]/10'
                        : 'bg-[#FFD700]/15 border border-[#FFD700]/25'
                    }`}>
                      <p className="text-white text-sm leading-relaxed" style={{ whiteSpace: 'pre-wrap' }}>{message.text}</p>
                    </div>
                    <p className="text-white/40 text-xs mt-1 px-2">{message.timestamp}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-[#FFD700]/20 p-4">
            <form onSubmit={handleSendMessage} className="flex gap-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type a student name or 'all students'..."
                className="flex-1 px-4 py-3 bg-black/40 border border-[#FFD700]/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD700]/40 transition-all duration-300"
              />
              <Button
                type="submit"
                className="bg-[#FFD700] hover:bg-[#FFD700]/90 text-black font-bold px-6 rounded-lg shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:shadow-[0_0_30px_rgba(255,215,0,0.5)] transition-all duration-300"
              >
                <Send size={20} />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIChatbotPage;
