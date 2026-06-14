import React, { useState, useEffect, useRef } from 'react';
import { PersonalityType } from '../personalities';
import './PetConversation.css';

interface Message {
  text: string;
  sender: 'pet' | 'user';
}

interface PetConversationProps {
  personality: PersonalityType;
  petName: string;
  onClose: () => void;
  onStatBoost: (type: 'mood' | 'friendship' | 'coins' | 'xp') => void;
}

const PetConversation: React.FC<PetConversationProps> = ({ personality, petName, onClose, onStatBoost }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    // Initial message
    const initialMessages: Record<PersonalityType, string> = {
      supportive: `Hi there! I was just thinking about how well you're doing. Want to chat?`,
      lazy: `Oh... hey. We're talking now? I hope this won't take too much energy...`,
      grumpy: `What? I'm busy. This better be important.`,
      hyper: `HEY HEY HEY! LET'S TALK! I HAVE SO MANY THINGS TO SAY! ARE YOU READY?!`,
      zen: `Greetings. I am listening with a quiet mind. What is on your heart?`,
      adventurous: `Adventure is calling! But I always have time for my favorite travel companion. What's on your mind?`
    };
    
    setMessages([{ text: initialMessages[personality], sender: 'pet' }]);
  }, [personality]);

  const addPetMessage = (text: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { text, sender: 'pet' }]);
      setIsTyping(false);
    }, 1000);
  };

  const handleOptionClick = (option: string) => {
    setMessages(prev => [...prev, { text: option, sender: 'user' }]);
    
    if (option === 'Goodbye') {
      addPetMessage(`Take care! See you soon.`);
      setTimeout(onClose, 2000);
      return;
    }

    // Pet response logic
    if (option === 'How are you?') {
      const responses: Record<PersonalityType, string> = {
        supportive: `I'm feeling great because I'm with you!`,
        lazy: `A bit tired, honestly. Even just floating here is a lot of work.`,
        grumpy: `None of your business. But since you asked... I've had better days.`,
        hyper: `I'M AWESOME! I HAVE SO MANY ENERGY! I WANT TO RUN A MARATHON!`,
        zen: `I am at peace. The universe is in harmony, and so am I.`,
        adventurous: `I'm ready to discover something new! Every day is a fresh map waiting to be drawn.`
      };
      addPetMessage(responses[personality]);
      onStatBoost('mood');
    } else if (option === 'Tell me a joke!') {
      const jokes: Record<PersonalityType, string> = {
        supportive: `Why did the dragon cross the road? To tell you you're doing a great job!`,
        lazy: `A joke? That sounds like effort. Let's just pretend I said something funny and laugh.`,
        grumpy: `My life is a joke. Also, your posture.`,
        hyper: `What do you call a dragon who can't move? A DRAG-ON! GET IT?! BECAUSE HE'S DRAGGING! HAHA!`,
        zen: `Knock knock. Who's there? The present moment. The present moment who? Just be here now.`,
        adventurous: `What do you call a dragon with a compass? An explorer who's never 'drag-ging' behind! Rawr!`
      };
      addPetMessage(jokes[personality]);
      onStatBoost('coins');
    } else if (option === 'Let\'s exercise!') {
      const responses: Record<PersonalityType, string> = {
        supportive: `I love that attitude! Let's get moving!`,
        lazy: `Can we... maybe... just stretch a little? While sitting?`,
        grumpy: `Finally. I thought you'd never ask. You're starting to look like a statue.`,
        hyper: `YEAAAH! LET'S GO! MOVEMENT IS LIFE! I'M ALREADY DOING PUSHUPS!`,
        zen: `Movement is a sacred dance. Let us begin our mindful practice.`,
        adventurous: `A training session! Perfect. We need to stay fit for the long trails ahead. Onward!`
      };
      addPetMessage(responses[personality]);
      onStatBoost('xp');
    } else if (option === 'You look cute!') {
      const responses: Record<PersonalityType, string> = {
        supportive: `Aww, thank you! You're pretty great too!`,
        lazy: `Cute? I'm just too lazy to look anything else.`,
        grumpy: `Hmph. Flattery will get you everywhere. Or nowhere. I haven't decided.`,
        hyper: `CUTE?! I'M ADORABLE! AND FAST! AND COOL! RAWR!`,
        zen: `Form is emptiness, emptiness is form. But thank you for your kind observation.`,
        adventurous: `I look like I'm ready for anything, right? A dash of cuteness, a ton of courage!`
      };
      addPetMessage(responses[personality]);
      onStatBoost('friendship');
    }
  };

  const options = ['How are you?', 'Tell me a joke!', 'Let\'s exercise!', 'You look cute!', 'Goodbye'];

  return (
    <div className="pet-conversation-overlay" onClick={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}>
      <div className="pet-conversation-window" onClick={e => e.stopPropagation()}>
        <div className="conversation-header">
          <h3>Chat with {petName}</h3>
          <button aria-label="Close" className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="conversation-messages">
          {messages.map((m, i) => (
            <div key={i} className={`message ${m.sender}`}>
              <div className="message-bubble">{m.text}</div>
            </div>
          ))}
          {isTyping && (
            <div className="message pet">
              <div className="message-bubble typing">...</div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        {!isTyping && (
          <div className="conversation-options">
            {options.map((o, i) => (
              <button key={i} className="option-btn" onClick={() => handleOptionClick(o)}>{o}</button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PetConversation;
