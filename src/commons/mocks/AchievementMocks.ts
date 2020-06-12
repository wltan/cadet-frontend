import {
  AchievementAbility,
  AchievementItem,
  AchievementModalItem,
  AchievementStatus
} from '../achievements/AchievementTypes';

export const achievementDict: { [id: number]: AchievementItem } = {
  1: {
    id: 1,
    title: 'Rune Master',
    ability: AchievementAbility.ACADEMIC,
    isTask: true,
    prerequisites: [2, 3],
    status: AchievementStatus.ACTIVE,
    completionGoal: 3
  },
  2: {
    id: 2,
    title: 'Beyond the Second Dimension',
    ability: AchievementAbility.ACADEMIC,
    exp: 250,
    deadline: new Date(2020, 7, 1, 0, 0, 0),
    isTask: false,
    status: AchievementStatus.ACTIVE,
    completionGoal: 100
  },
  3: {
    id: 3,
    title: 'Colorful Carpet',
    ability: AchievementAbility.ACADEMIC,
    exp: 250,
    deadline: new Date(2020, 7, 3, 0, 0, 0),
    isTask: false,
    status: AchievementStatus.ACTIVE,
    completionGoal: 100
  },
  4: {
    id: 4,
    title: 'Keyboard Warrior',
    ability: AchievementAbility.COMMUNITY,
    isTask: true,
    prerequisites: [5, 6, 7],
    status: AchievementStatus.ACTIVE,
    completionGoal: 3
  },
  5: {
    id: 5,
    title: 'Keyboard Warrior - Bronze Tier',
    ability: AchievementAbility.COMMUNITY,
    exp: 50,
    isTask: false,
    status: AchievementStatus.COMPLETED,
    completionGoal: 10
  },
  6: {
    id: 6,
    title: 'Keyboard Warrior - Silver Tier',
    ability: AchievementAbility.COMMUNITY,
    exp: 100,
    isTask: false,
    status: AchievementStatus.COMPLETED,
    completionGoal: 50
  },
  7: {
    id: 7,
    title: 'Keyboard Warrior - Gold Tier',
    ability: AchievementAbility.COMMUNITY,
    exp: 200,
    isTask: false,
    status: AchievementStatus.ACTIVE,
    completionGoal: 100
  },
  8: {
    id: 8,
    title: "That was Sort'a Easy",
    ability: AchievementAbility.ACADEMIC,
    exp: 250,
    deadline: new Date(2020, 6, 4, 0, 0, 0),
    isTask: true,
    status: AchievementStatus.EXPIRED,
    completionGoal: 100
  },
  9: {
    id: 9,
    title: 'Mission Master',
    ability: AchievementAbility.EFFORT,
    exp: 80,
    isTask: true,
    prerequisites: [1, 8],
    status: AchievementStatus.ACTIVE,
    completionGoal: 2
  }
};

export const achievementModalDict: { [id: number]: AchievementModalItem } = {
  1: {
    id: 1,
    title: 'Rune Master',
    modalImageUrl:
      'https://source-academy-assets.s3-ap-southeast-1.amazonaws.com/images/robotDog%40x2.png',
    description: 'Cookies!',
    exp: 200,
    goal: 'Complete Beyond the Second Dimension & Colorful Carpet missions.',
    completionText: 'Cooooookiess!!!'
  },
  2: {
    id: 2,
    title: 'Beyond the Second Dimension',
    modalImageUrl:
      'https://source-academy-assets.s3-ap-southeast-1.amazonaws.com/images/glowingLine%40x2.png',
    description: 'Huehuehuehuehuehuehuehue',
    exp: 100,
    goal: 'Complete Beyond the Second Dimension mission.',
    completionText: 'BTSD'
  },
  3: {
    id: 3,
    title: 'Colorful Carpet',
    modalImageUrl:
      'https://source-academy-assets.s3-ap-southeast-1.amazonaws.com/images/gosperCurve%40x2.png',
    description: 'Uvuvwevwevwe Onyetenyevwe Ugwemubwem Ossas',
    exp: 100,
    goal: 'Complete Colorful Carpet mission.',
    completionText: 'CC'
  },
  4: {
    id: 4,
    title: 'Keyboard Warrior',
    modalImageUrl:
      'https://source-academy-assets.s3-ap-southeast-1.amazonaws.com/images/morseCode%40x2.png',
    description:
      'Compiled successfully! You can now view cadet-frontend in the browser. Note that the development build is not optimized. To create a production build, use yarn build.',
    exp: 350,
    goal: 'Reach Gold Tier in Keyboard Warrior achievements.',
    completionText: 'YOU DA KEYBOARD WARRIOR'
  },
  8: {
    id: 8,
    title: "That was Sort'a Easy",
    modalImageUrl:
      'https://source-academy-assets.s3-ap-southeast-1.amazonaws.com/images/mysteryCube%40x2.png',
    description: 'description',
    exp: 250,
    goal: 'Complete Sorting mission.',
    completionText: 'Good job!'
  },
  9: {
    id: 9,
    title: 'Mission Master',
    modalImageUrl:
      'https://source-academy-assets.s3-ap-southeast-1.amazonaws.com/images/messyClassroom%40x2.png',
    description: '?',
    exp: 80,
    goal: "Complete Rune Master & That was Sort'a Easy achievement.",
    completionText: 'Such wow. Mission Master.'
  }
};