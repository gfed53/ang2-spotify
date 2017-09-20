17/9/19-20:

Scroll-to-artist-result bug:
	
	- FAILS: When user makes first search (calling getArtist from within SearchComponent)
	- WORKS: After any subsequent search (calling getArtist from within SearchComponent)
	- FAILS: When user makes any related search (calling getRelated from within ArtistResultComponent)
	