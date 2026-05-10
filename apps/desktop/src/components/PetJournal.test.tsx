import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import PetJournal from "./PetJournal";
import "@testing-library/jest-dom";
import { Achievement } from "../achievements";
import { FriendshipData } from "../hooks/usePetFriendship";
import { DiaryEntry } from "./PetDiary";
import { PetDream } from "./PetDreams";

describe("PetJournal", () => {
  const mockMilestones = [
    { level: 2, date: new Date().toISOString(), description: "Reached Level 2!" }
  ];

  const mockAchievements: Achievement[] = [
    { id: "first_steps", title: "First Steps", description: "Complete your first movement.", icon: "👟", unlockedAt: new Date().toISOString() }
  ];

  const mockFriendshipData: FriendshipData = {
    level: 2,
    title: "Buddy",
    value: 30,
    nextLevelValue: 45,
    multiplier: 1.05
  };

  const mockDiaryEntries: DiaryEntry[] = [
    { id: "1", text: "Test entry", date: new Date().toISOString(), mood: "joyful", level: 3 }
  ];

  const mockDreams: PetDream[] = [
    { id: "1", text: "I dreamed of flying", date: new Date().toISOString(), personality: "Hyper" }
  ];

  const mockDailyNeedsAvg = { hunger: 80, hydration: 75, energy: 90, samples: 10 };
  const mockWeeklyData = [
    { day: "Sun", moves: 5, calories: 100, avgMood: 85, moodSamples: 5 },
    { day: "Mon", moves: 3, calories: 60, avgMood: 65, moodSamples: 3 },
  ];
  const mockAppUsage = { "Cursor": 120, "Zed": 45 };

  it("renders level and achievements", () => {
    render(
      <PetJournal
        level={3}
        xp={25}
        nextLevelXp={50}
        adoptionDate={new Date().toISOString()}
        milestones={mockMilestones}
        unlockedAchievements={mockAchievements}
        friendshipData={mockFriendshipData}
        diaryEntries={[]}
        onAddDiaryEntry={() => {}}
        onDeleteDiaryEntry={() => {}}
        petDreams={[]}
        currentMood="joyful"
        dailyNeedsAvg={mockDailyNeedsAvg}
        weeklyData={mockWeeklyData}
        appUsage={mockAppUsage}
        onOpenCollection={() => {}}
        onClose={() => {}}
      />
    );

    expect(screen.getByText("Pet Journal")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument(); // Level
    expect(screen.getByText("125")).toBeInTheDocument(); // Total XP: (3-1)*50 + 25
    
    // Switch to Awards tab
    fireEvent.click(screen.getByText("Awards"));
    expect(screen.getByText("First Steps")).toBeInTheDocument();
    
    // Switch to Memories tab
    fireEvent.click(screen.getByText("Memories"));
    expect(screen.getByText("Reached Level 2!")).toBeInTheDocument();
    
    // Switch back to Stats
    fireEvent.click(screen.getByText("Stats"));
    expect(screen.getAllByText(/Buddy/).length).toBeGreaterThan(0);
  });

  it("renders dreams tab", () => {
    render(
      <PetJournal
        level={3}
        xp={25}
        nextLevelXp={50}
        adoptionDate={new Date().toISOString()}
        milestones={mockMilestones}
        unlockedAchievements={mockAchievements}
        friendshipData={mockFriendshipData}
        diaryEntries={[]}
        onAddDiaryEntry={() => {}}
        onDeleteDiaryEntry={() => {}}
        petDreams={mockDreams}
        currentMood="joyful"
        dailyNeedsAvg={mockDailyNeedsAvg}
        weeklyData={mockWeeklyData}
        appUsage={mockAppUsage}
        onOpenCollection={() => {}}
        onClose={() => {}}
      />
    );

    // Switch to Dreams tab
    fireEvent.click(screen.getByText("Dreams"));
    expect(screen.getByText("Dream Journal")).toBeInTheDocument();
    expect(screen.getByText("I dreamed of flying")).toBeInTheDocument();
  });

  it("renders usage tab", () => {
    render(
      <PetJournal
        level={3}
        xp={25}
        nextLevelXp={50}
        adoptionDate={new Date().toISOString()}
        milestones={mockMilestones}
        unlockedAchievements={mockAchievements}
        friendshipData={mockFriendshipData}
        diaryEntries={[]}
        onAddDiaryEntry={() => {}}
        onDeleteDiaryEntry={() => {}}
        petDreams={[]}
        currentMood="joyful"
        dailyNeedsAvg={mockDailyNeedsAvg}
        weeklyData={mockWeeklyData}
        appUsage={mockAppUsage}
        onOpenCollection={() => {}}
        onClose={() => {}}
      />
    );

    // Switch to Usage tab
    fireEvent.click(screen.getByText("Usage"));
    expect(screen.getByText("Focus App Usage (Today) 🖥️")).toBeInTheDocument();
    expect(screen.getByText("Cursor")).toBeInTheDocument();
    expect(screen.getByText("120 min")).toBeInTheDocument();
    expect(screen.getByText("Total Focus Time:")).toBeInTheDocument();
    expect(screen.getByText(/165 minutes/)).toBeInTheDocument();
  });

  it("calculates and displays days together correctly", () => {
    // 3 days ago
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    
    render(
      <PetJournal
        level={1}
        xp={0}
        nextLevelXp={50}
        adoptionDate={threeDaysAgo.toISOString()}
        milestones={[]}
        unlockedAchievements={[]}
        friendshipData={mockFriendshipData}
        diaryEntries={[]}
        onAddDiaryEntry={() => {}}
        onDeleteDiaryEntry={() => {}}
        petDreams={[]}
        currentMood="joyful"
        dailyNeedsAvg={mockDailyNeedsAvg}
        weeklyData={mockWeeklyData}
        appUsage={{}}
        onOpenCollection={() => {}}
        onClose={() => {}}
      />
    );

    expect(screen.getByText("Days Together")).toBeInTheDocument();
    const daysValue = screen.getByText(/[34]/);
    expect(daysValue).toBeInTheDocument();
  });

  it("renders wellness tab", () => {
    render(
      <PetJournal
        level={3}
        xp={25}
        nextLevelXp={50}
        adoptionDate={new Date().toISOString()}
        milestones={mockMilestones}
        unlockedAchievements={mockAchievements}
        friendshipData={mockFriendshipData}
        diaryEntries={[]}
        onAddDiaryEntry={() => {}}
        onDeleteDiaryEntry={() => {}}
        petDreams={[]}
        currentMood="joyful"
        dailyNeedsAvg={mockDailyNeedsAvg}
        weeklyData={mockWeeklyData}
        appUsage={{}}
        onOpenCollection={() => {}}
        onClose={() => {}}
      />
    );

    // Switch to Wellness tab
    fireEvent.click(screen.getByText("Wellness"));
    expect(screen.getByText("Pet Wellness Report 📈")).toBeInTheDocument();
    expect(screen.getByText("Care Score")).toBeInTheDocument();
    expect(screen.getByText("82")).toBeInTheDocument();
  });

  it("renders diary entries", () => {
    render(
      <PetJournal
        level={3}
        xp={25}
        nextLevelXp={50}
        adoptionDate={new Date().toISOString()}
        milestones={mockMilestones}
        unlockedAchievements={mockAchievements}
        friendshipData={mockFriendshipData}
        diaryEntries={mockDiaryEntries}
        onAddDiaryEntry={() => {}}
        onDeleteDiaryEntry={() => {}}
        petDreams={[]}
        currentMood="joyful"
        dailyNeedsAvg={mockDailyNeedsAvg}
        weeklyData={mockWeeklyData}
        appUsage={{}}
        onOpenCollection={() => {}}
        onClose={() => {}}
      />
    );

    // Switch to Diary tab
    fireEvent.click(screen.getByText("Diary"));
    expect(screen.getByText("Test entry")).toBeInTheDocument();
  });

  it("shows empty state messages", () => {
    render(
      <PetJournal
        level={1}
        xp={0}
        nextLevelXp={50}
        adoptionDate={new Date().toISOString()}
        milestones={[]}
        unlockedAchievements={[]}
        friendshipData={mockFriendshipData}
        diaryEntries={[]}
        onAddDiaryEntry={() => {}}
        onDeleteDiaryEntry={() => {}}
        petDreams={[]}
        currentMood="joyful"
        dailyNeedsAvg={{ hunger: 0, hydration: 0, energy: 0, samples: 0 }}
        weeklyData={[]}
        appUsage={{}}
        onOpenCollection={() => {}}
        onClose={() => {}}
      />
    );

    fireEvent.click(screen.getByText("Awards"));
    expect(screen.getByText(/No achievements unlocked yet/)).toBeInTheDocument();
    
    fireEvent.click(screen.getByText("Memories"));
    expect(screen.getByText(/Your journey is just beginning/)).toBeInTheDocument();

    fireEvent.click(screen.getByText("Diary"));
    expect(screen.getByText(/No memories recorded yet/)).toBeInTheDocument();

    fireEvent.click(screen.getByText("Dreams"));
    expect(screen.getByText(/No dreams recorded yet/)).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    const onClose = vi.fn();
    render(
      <PetJournal
        level={1}
        xp={0}
        nextLevelXp={50}
        adoptionDate={new Date().toISOString()}
        milestones={[]}
        unlockedAchievements={[]}
        friendshipData={mockFriendshipData}
        diaryEntries={[]}
        onAddDiaryEntry={() => {}}
        onDeleteDiaryEntry={() => {}}
        petDreams={[]}
        currentMood="joyful"
        dailyNeedsAvg={mockDailyNeedsAvg}
        weeklyData={mockWeeklyData}
        appUsage={{}}
        onOpenCollection={() => {}}
        onClose={onClose}
      />
    );

    const closeButton = screen.getByText("×");
    closeButton.click();
    expect(onClose).toHaveBeenCalled();
  });
});
