interface ChallengeConfiguration {
    name: string,
    description: string,
    level: string,
    vulnerable: boolean,
    extendsContext: boolean
}

export default ChallengeConfiguration;