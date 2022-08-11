import Layout from '../../components/Layout'
import ScoreCard from '../../components/ScoreCard'
import { useRouter } from 'next/router'
import useName from '../../lib/useName'
import useGolferScores from '../../lib/useGolferScores'

function GolferInfo (){
	const router = useRouter()
	const id = router.query.id
	const { scores, scoresError } = useGolferScores(id)
	const { name, nameError } = useName(id)

	return (
    <Layout>
			<h1>Scores of: {name}</h1>
      <>
        {nameError ? (
          nameError
        ) : (
          <>
            {scores && scores.map(score => (
              <ScoreCard
                key={score.id}
                id={score.id}
                totalScore={score.total_score}
                playedAt={score.played_at}
                userId={score.user_id}
                userName={name}
              />
            ))}
          </>
        )}
      </>
    </Layout>
	)
}

export default GolferInfo