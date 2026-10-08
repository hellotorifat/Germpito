"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "bn";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  // Navbar
  "nav.dashboard": { en: "Dashboard", bn: "ড্যাশবোর্ড" },
  "nav.learning": { en: "Learning Zone", bn: "শিক্ষা অঞ্চল" },
  "nav.tests": { en: "Mock Test Hub", bn: "মক টেস্ট হাব" },
  "nav.flashcards": { en: "Flashcards", bn: "ফ্ল্যাশকার্ড" },
  "nav.progress": { en: "My Progress", bn: "আমার অগ্রগতি" },
  "nav.settings": { en: "Settings", bn: "সেটিংস" },
  "nav.title": { en: "DeutschMeister", bn: "ডয়েচমাইস্টার" },
  "nav.subtitle": { en: "German Learning Platform", bn: "জার্মান শিক্ষা প্ল্যাটফর্ম" },

  // Dashboard
  "dash.welcome": { en: "Welcome back, Alex! 👋", bn: "ফিরে আসার জন্য স্বাগতম, Alex! 👋" },
  "dash.subtitle": { en: "You're on a 7-day streak. Keep it up!", bn: "আপনি ৭ দিনের ধারাবাহিকতায় আছেন। চালিয়ে যান!" },
  "dash.overall_progress": { en: "Overall Progress", bn: "সামগ্রিক অগ্রগতি" },
  "dash.current_level": { en: "Current Level", bn: "বর্তমান স্তর" },
  "dash.streak": { en: "Day Streak", bn: "দিনের ধারা" },
  "dash.tests_taken": { en: "Tests Taken", bn: "পরীক্ষা দেওয়া হয়েছে" },
  "dash.avg_score": { en: "Avg. Score", bn: "গড় স্কোর" },
  "dash.skills_analysis": { en: "Skills Analysis", bn: "দক্ষতা বিশ্লেষণ" },
  "dash.recent_tests": { en: "Recent Test Results", bn: "সাম্প্রতিক পরীক্ষার ফলাফল" },
  "dash.quick_actions": { en: "Quick Actions", bn: "দ্রুত কার্যক্রম" },
  "dash.start_test": { en: "Start A1 Mock Test", bn: "A1 মক টেস্ট শুরু করুন" },
  "dash.review_flash": { en: "Review Flashcards", bn: "ফ্ল্যাশকার্ড পর্যালোচনা করুন" },
  "dash.continue_lesson": { en: "Continue Lesson", bn: "পাঠ চালিয়ে যান" },
  "dash.recommendations": { en: "Targeted Recommendations", bn: "লক্ষ্যভিত্তিক পরামর্শ" },
  "dash.rec_subtitle": { en: "Based on your recent performance", bn: "আপনার সাম্প্রতিক পারফরম্যান্সের উপর ভিত্তি করে" },
  "dash.study_now": { en: "Study Now", bn: "এখন পড়ুন" },

  // Levels
  "level.a1": { en: "A1 - Beginner", bn: "A1 - শিক্ষানবিশ" },
  "level.a2": { en: "A2 - Elementary", bn: "A2 - প্রাথমিক" },
  "level.b1": { en: "B1 - Intermediate", bn: "B1 - মধ্যবর্তী" },
  "level.b2": { en: "B2 - Upper Intermediate", bn: "B2 - উচ্চ-মধ্যবর্তী" },

  // Exam
  "exam.reading": { en: "Lesen (Reading)", bn: "লেজেন (পড়া)" },
  "exam.listening": { en: "Hören (Listening)", bn: "হ্যোরেন (শোনা)" },
  "exam.writing": { en: "Schreiben (Writing)", bn: "শ্রাইবেন (লেখা)" },
  "exam.speaking": { en: "Sprechen (Speaking)", bn: "শ্প্রেখেন (বলা)" },
  "exam.timer": { en: "Time Remaining", bn: "অবশিষ্ট সময়" },
  "exam.question": { en: "Question", bn: "প্রশ্ন" },
  "exam.of": { en: "of", bn: "এর মধ্যে" },
  "exam.submit": { en: "Submit Test", bn: "পরীক্ষা জমা দিন" },
  "exam.next": { en: "Next", bn: "পরবর্তী" },
  "exam.prev": { en: "Previous", bn: "পূর্ববর্তী" },
  "exam.true": { en: "True", bn: "সত্য" },
  "exam.false": { en: "False", bn: "মিথ্যা" },
  "exam.word_count": { en: "Word Count", bn: "শব্দ গণনা" },
  "exam.plays_left": { en: "plays remaining", bn: "বার বাজানো বাকি" },
  "exam.play_audio": { en: "Play Audio", bn: "অডিও বাজান" },
  "exam.start_record": { en: "Start Recording", bn: "রেকর্ডিং শুরু করুন" },
  "exam.stop_record": { en: "Stop Recording", bn: "রেকর্ডিং বন্ধ করুন" },
  "exam.passage": { en: "Reading Passage", bn: "পড়ার অনুচ্ছেদ" },
  "exam.instructions": { en: "Instructions", bn: "নির্দেশনা" },
  "exam.confirm_submit": { en: "Are you sure you want to submit?", bn: "আপনি কি নিশ্চিতভাবে জমা দিতে চান?" },
  "exam.time_warning": { en: "Less than 5 minutes remaining!", bn: "৫ মিনিটের কম সময় বাকি!" },

  // Results
  "results.title": { en: "Test Results", bn: "পরীক্ষার ফলাফল" },
  "results.score": { en: "Your Score", bn: "আপনার স্কোর" },
  "results.correct": { en: "Correct", bn: "সঠিক" },
  "results.incorrect": { en: "Incorrect", bn: "ভুল" },
  "results.breakdown": { en: "Answer Breakdown", bn: "উত্তর বিশ্লেষণ" },
  "results.recommendations": { en: "Study Recommendations", bn: "অধ্যয়ন পরামর্শ" },
  "results.retake": { en: "Retake Test", bn: "পুনরায় পরীক্ষা দিন" },
  "results.back": { en: "Back to Hub", bn: "হাবে ফিরে যান" },
  "results.passed": { en: "Passed! 🎉", bn: "পাস! 🎉" },
  "results.failed": { en: "Keep Practicing 💪", bn: "অনুশীলন চালিয়ে যান 💪" },

  // Learning Zone
  "learn.title": { en: "Learning Zone", bn: "শিক্ষা অঞ্চল" },
  "learn.subtitle": { en: "Structured German lessons from A1 to B2", bn: "A1 থেকে B2 পর্যন্ত কাঠামোগত জার্মান পাঠ" },
  "learn.vocabulary": { en: "Vocabulary", bn: "শব্দভাণ্ডার" },
  "learn.grammar": { en: "Grammar", bn: "ব্যাকরণ" },
  "learn.lessons": { en: "Lessons", bn: "পাঠসমূহ" },
  "learn.start": { en: "Start Learning", bn: "শেখা শুরু করুন" },
  "learn.continue": { en: "Continue", bn: "চালিয়ে যান" },
  "learn.completed": { en: "Completed", bn: "সম্পন্ন" },

  // Flashcards
  "flash.front": { en: "German Word", bn: "জার্মান শব্দ" },
  "flash.back": { en: "Translation", bn: "অনুবাদ" },
  "flash.flip": { en: "Tap to flip", bn: "উল্টাতে ট্যাপ করুন" },
  "flash.knew": { en: "I knew it! ✓", bn: "আমি জানতাম! ✓" },
  "flash.didnt": { en: "Review again", bn: "আবার পর্যালোচনা করুন" },

  // Misc
  "misc.loading": { en: "Loading...", bn: "লোড হচ্ছে..." },
  "misc.save": { en: "Save", bn: "সংরক্ষণ করুন" },
  "misc.cancel": { en: "Cancel", bn: "বাতিল করুন" },
  "misc.close": { en: "Close", bn: "বন্ধ করুন" },
  "misc.select_level": { en: "Select Level", bn: "স্তর নির্বাচন করুন" },
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: (key) => key,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("en");

  const t = (key: string): string => {
    return translations[key]?.[lang] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
