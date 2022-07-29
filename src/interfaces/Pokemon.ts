export default interface Pokemon {
  id: number,
  name: string,
  sprites: {
    other: {
      dream_world: {
        front_default: string
      }
    }
  },
  weight: number,
  stats: [
    {
      base_stat: number,
    },
    {
      base_stat: number,
    },
    {
      base_stat: number,
    },
    {
      base_stat: number,
    },
    {
      base_stat: number,
    },
    {
      base_stat: number,
    },
  ]
}
