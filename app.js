function damage(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      playerHP: 100,
      monsterHP: 100,
      round: 0,
      result: null,
      logMessages: [],
    };
  },
  methods: {
    attackMonster() {
      this.round++;
      const attackValue = damage(5, 12);
      this.monsterHP -= attackValue; // =  this.monsterHP = this.monsterHP - attackValue;
      this.addLogMess("player", "attack", attackValue);
      this.attackPlayer();
    },
    attackPlayer() {
      this.round++;
      const attackValue = damage(10, 15);
      this.playerHP -= attackValue;
      this.addLogMess("monster", "attack", attackValue);
    },
    specialMonster() {
      this.round++;
      const attackValue = damage(20, 30);
      this.monsterHP -= attackValue;
      this.addLogMess("player", "attack", attackValue);
      this.attackPlayer();
    },
    heal() {
      this.round++;
      const healValue = damage(5, 20);

      if (this.playerHP + this.healValue > 100) {
        this.playerHP = 100;
      } else {
        this.playerHP += healValue;
      }
      this.addLogMess("player", "heal", healValue);
      this.attackPlayer();
    },
    restartGame() {
      this.playerHP = 100;
      this.monsterHP = 100;
      this.round = 0;
      this.result = null;
      this.logMessages = [];
    },
    surrender() {
      this.playerHP = 0;
      this.addLogMess("player", "surrender");
    },
    addLogMess(who, what, value) {
      this.logMessages.push({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
  },
  computed: {
    monsterHPBar() {
      if (this.monsterHP <= 0) {
        return { width: "0%" };
      } else return { width: this.monsterHP + "%" };
    },
    playerHPBar() {
      if (this.playerHP <= 0) {
        return { width: "0%" };
      } else return { width: this.playerHP + "%" };
    },
    specialAttackYN() {
      return this.round % 3 !== 0;
    },
  },
  watch: {
    playerHP(value) {
      if (value <= 0 && this.monsterHP <= 0) {
        this.result = "Draw";
      } else if (value <= 0) {
        this.result = "Monster win";
      }
    },
    monsterHP(value) {
      if (value <= 0 && this.playerHP <= 0) {
        this.result = "Draw";
      } else if (value <= 0) {
        this.result = "Player win";
      }
    },
  },
});

app.mount("#game");
