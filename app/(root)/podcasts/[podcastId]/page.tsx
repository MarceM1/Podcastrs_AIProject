'use client'

import LoaderSpinner from '@/components/LoaderSpinner'
import PodcastCard from '@/components/PodcastCard'
import PodcastDetailPlayer from '@/components/PodcastDetailPlayer'
import EmptyState from '@/components/EmptyState'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useQuery } from 'convex/react'
import Image from 'next/image'
import React from 'react'
import { useUser } from '@clerk/nextjs'

function PodcastDetails({ params: { podcastId } }: { params: { podcastId: Id<'podcasts'> } }) {

	const { user } = useUser()
	const podcast = useQuery(api.podcasts.getPodcastById, { podcastId })
	const similarPodcasts = useQuery(api.podcasts.getPodcastByVoiceType, { podcastId })

	const isOwner = user?.id === podcast?.authorId

	if (!similarPodcasts || !podcast) return <LoaderSpinner />

	return (
		<section className="flex w-full flex-col">
			<header className="mt-9 flex items-center justify-between">
				<h1 className='text-20 font-bold text-white-1'>
					Current Playing
				</h1>
				<figure className="flex gap-3">
					<Image src={"/icons/headphone.svg"} alt='Headhones Icon' width={24} height={24} />
					<h2 className="text-16 font-bold text-white-1">{podcast?.views}</h2>
				</figure>
			</header>
			<PodcastDetailPlayer 
				isOwner ={isOwner}
				podcastId={podcast._id}
				{...podcast}
			/>
			<p className="text-white-2 text-16 pb-8 pt-[45px] font-medium max-md:text-center">
				{podcast?.podcastDescription}
			</p>
			<div className="flex flex-col gap-8">
				<div className="flex flex-col gap-4">
					<h2 className='text-18 font-bold text-white-1'>Transcription</h2>
					<p className='text-16 font-medium text-white-2'>{podcast?.voicePrompt}</p>
				</div>
				<div className="flex flex-col gap-4">
					<h2 className='text-18 font-bold text-white-1'>Thumbnail Prompt</h2>
					<p className='text-16 font-medium text-white-2'>{podcast?.imagePrompt}</p>
				</div>
			</div>
			<article className='mt-8 flex flex-col gap-5'>
				<h2 className='text-20 font-bold text-white-1'>Similar Podcasts</h2>
				{similarPodcasts && similarPodcasts.length > 0 ? (
					<div>
						<div className="podcast_grid">
							{similarPodcasts?.map(({ _id, podcastTitle, podcastDescription, imageUrl }) => (
								<PodcastCard
									key={_id}
									imgUrl={imageUrl!}
									title={podcastTitle}
									description={podcastDescription}
									podcastId={_id} />
							))}
						</div>
					</div>
				) : (
					<>
						<EmptyState
							title='No similar podcast found'
							buttonLink='/discover'
							buttonText='Discover more podcasts'
						/>
					</>
				)}
			</article>

		</section>
	)
}

export default PodcastDetails