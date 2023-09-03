const matches = [
	{
		id: 1,
		homeTeamId: 16,
		homeTeamGoals: 1,
		awayTeamId: 8,
		awayTeamGoals: 1,
		inProgress: false,
		homeTeam: {
			teamName: "São Paulo"
		},
		awayTeam: {
			teamName: "Grêmio"
		}
	},
	{
		id: 2,
		homeTeamId: 9,
		homeTeamGoals: 1,
		awayTeamId: 14,
		awayTeamGoals: 1,
		inProgress: false,
		homeTeam: {
			teamName: "Internacional"
		},
		awayTeam: {
			teamName: "Santos"
		}
	},
]

const teamInProgress = {
  id: 1,
  homeTeamId: 16,
  homeTeamGoals: 1,
  awayTeamId: 8,
  awayTeamGoals: 1,
  inProgress: true,
  homeTeam: {
    teamName: "São Paulo"
  },
  awayTeam: {
    teamName: "Grêmio"
  }
};

const teamWithUpdatedPlacar = {
  id: 1,
  homeTeamId: 16,
  homeTeamGoals: 4,
  awayTeamId: 8,
  awayTeamGoals: 2,
  inProgress: true,
};

const teamFinished = {
  id: 1,
  homeTeamId: 16,
  homeTeamGoals: 1,
  awayTeamId: 8,
  awayTeamGoals: 1,
  inProgress: false,
  homeTeam: {
    teamName: "São Paulo"
  },
  awayTeam: {
    teamName: "Grêmio"
  }
};

const homeTeam = {
  id: 16,
  teamName: 'São Paulo'
}

const awayTeam = {
  id: 8,
  teamName: 'Grêmio'
};

const matchCreated = {
	id: 49,
	homeTeamId: 16,
	homeTeamGoals: 2,
	awayTeamId: 8,
	awayTeamGoals: 2,
	inProgress: true
}

export {
  matches,
  teamInProgress,
  teamFinished,
  teamWithUpdatedPlacar,
  homeTeam,
  awayTeam,
  matchCreated,
}