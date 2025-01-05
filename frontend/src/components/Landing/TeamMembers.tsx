const TeamMembers = () => {
  const teamMembers = [
    {
      name: "Rajesh Adhikari",
      image: "/rajesh.jpg",
    },
    {
      name: "Saurav Kumar Mahato",
      image: "/saurav1.jpg",
    },
    {
      name: "Subash Lamichhane",
      image: "/subash.jpg",
    },
  ];

  return (
    <div id="team-members" className="bg-black text-white py-16 px-8">
      <h2 className="text-center text-4xl font-bold mb-12 text-purple-400">Meet Our Team</h2>
      <div className="flex flex-col md:flex-row justify-center gap-8">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className=" transition-colors rounded-lg p-6 w-full md:w-1/3 text-center"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-48 h-48 mx-auto rounded-full mb-4 border-4 border-purple-400"
            />
            <h3 className="text-4xl font-semibold mb-2 text-purple-400">{member.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamMembers;
