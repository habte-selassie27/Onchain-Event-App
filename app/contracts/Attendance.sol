// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.19;

contract Attendance {


   event attendeeRegister(address indexed user, string name, uint256 age, uint256 ticketId, bool isRegistered);
   event attendeeFinder(address indexed user, string name, uint256 age, uint256 ticketId, bool isRegistered);
   event attendeeUpdater(address indexed user, string name, uint256 age, uint256 ticketId, bool isRegistered);
   event attendeeRemover(address indexed user, string name, uint256 age, uint256 ticketId, bool isRegistered);

   enum eventRole { Admin, Organizer, User}

   eventRole public usersLevel;


   struct Attendee {
    address user;
    string name;
    uint256 age;
    uint256 ticketId;
    bool isRegistered;
   
   } 

   struct Session {
    address organizer;
    // uint256 attendeeId;
    uint256 sessionId;
    string topic;
    uint256 startTime;
    uint256 endTime;
    bool isActive;
  
   }

//    struct userSession {
//     address user;
//     uint256 sessionId;
//     bool isPresent;
//     uint256 eventTime;
//    }

   struct Admin {
    address user;
    bool isAuthorized;
   }

  
  struct AttendanceInfo {
    bool isAttending;
    uint256 eventId;
    uint256 ticketId;
    uint256 eventTime;
}


mapping(address => mapping(uint256 => AttendanceInfo)) userAttendanceInfo;


    

    address public user;

    address public admin;


     mapping(address => Attendee) public attendes;
     mapping(uint256 => Session)  public sessions;
     mapping(address => Admin)  public admins;
     mapping(address => eventRole) public userRoles;
     mapping(address => AttendanceInfo)  public attendanceInformation;
     mapping(address => bool)  public isAdmin;
     mapping(address => uint256)  public userBalance;
     mapping(uint256 => address)  public ticketIdToUser;
     mapping(address => uint256)  public userToTicketId;
     mapping(uint256 => address[])  public sessionToAttendees;
   
     mapping(address => uint256[])  public trackEachSessionUserAttendedUsingAddress;
     mapping(address => mapping (uint256 => bool)) public isUserRegisteredForSession;
     mapping(address => mapping(uint256 => bool)) public isUserAuthorizedForTheSession;
     mapping(address => mapping(uint256 => bool))  public isUserAttendingTheSession;
     mapping(address => mapping(uint256 =>bool))  public userMustAttendAtMostOnlyOneEventAtSpecficTime;
     mapping(address => uint256[])  public trackMultiEventForSingleUser;
     mapping(uint256 => uint[])  public sessionToMultiTicketId;


   constructor(address _admin, address _user,uint256 _sessionId) {
    // admin is also authorized for giving users right to attend an event after checking them
      admins[_admin].isAuthorized = true;
      attendes[_user].ticketId = 0;
    //   admins[_admin].sessions= true;
   }

    modifier AdminsOnly (address _admin, uint _userLevel) {
        require(isAdmin[msg.sender] == true,"Only Admin Can Call This Function");
        require(userRoles[_admin] == eventRole.Admin,"Admin Role Privilleges");
        _;
    }

    function registerAttendee(address _user, string calldata _name, uint256 _age,uint256 _ticketId,bool )  external payable{
       require(_user != address(0),"Invalid Address For Registration");
       require(!attendes[_user].isRegistered , "user already registerd");
       
       attendes[msg.sender] = Attendee({
         user : _user,
         name : _name,
         age : _age,
         ticketId : _ticketId,
         isRegistered: true
       });

       attendes[user].name = _name;
       attendes[user].age = _age;
       attendes[user].age = _age;
       attendes[user].age = _age;
       attendes[user].age = _age;

      //string calldata user = new Attendee({});
       payable(block.coinbase).transfer(1);
       emit attendeeRegister(msg.sender,  _name,  _age, _ticketId,i);
    }

    function getRegisteredUser(address user) external returns( address,string memory , uint256, bool) {
       Attendee memory attendeeData = attendes[user];
       return( attendeeData.name, attendeeData.age, attendeeData.ticketId, attendeeData.isRegistered) ;
       emit attendeeFinder(msg.sender);
    }

    function updateUserData(uint256 _ticketId, uint256 _age,
     string memory _name, address _user,bool _isRegistered) external {
        require(attendes[msg.sender].ticketId != 0,"user is not registered");
        require(attendes[msg.sender].isRegistered , "user is not registerd");
        Attendee storage _updatedAttendee = attendes[0];
        _updatedAttendee.user = _user;
        _updatedAttendee.name = _name;
        _updatedAttendee.age = _age;
        _updatedAttendee.ticketId = _ticketId;
        _updatedAttendee.isRegistered = _isRegistered;

         emit attendeeUpdater(msg.sender, _ticketId, _age, _name,  _user,_isRegistered);
        //Attendee storage 
    }

    function deleteUser(uint256 _ticketId) external {
        require(attendes[msg.sender].ticketId != 0,"user is not registered");
        require(attendes[msg.sender].isRegistered , "user is not registerd");
        Attendee storage _attendeeData = attendes[_ticketId];
        delete _attendeeData;
        emit attendeeRemover(msg.sender, _ticketId);
    }


     function authorizedForSesssion(address _attendee, uint256 _sessionId) external {
        require(isAdmin[msg.sender] ,"Only Admin can authorize users for a session");
        isUserAuthorizedForTheSession[_attendee][_sessionId] = true;
     }

   //  3. userSession (Attendance Record)
   event attendanceGiven(address indexed _user, uint indexed _sessionId, uint256 timestamp);
   event attendanceUpdated(address indexed user, uint256 indexed sessionId, bool newStatus, uint256 updatedAt);
   event attendanceDeleted(address indexed user, uint256 indexed sessionId);


      //Create: Mark attendance (e.g., when user checks in).
      function giveAttendanceForUsers(address _user, uint256 _sessionId) AdminsOnly(admin,0) external {
        require(attendes[_user].user != address(0),"User Address Must Be Non Zero");
        require(isUserRegisteredForSession[_user][_sessionId] == true, "User Must Be Registered");
        require(!userAttendanceInfo[_user][_sessionId].isAttending,"User is already have attendance");
        require(sessions[_sessionId].isActive,"The Event Must Be happening");
        trackEachSessionUserAttendedUsingAddress[_user].push(_sessionId);
        userAttendanceInfo[_user][_sessionId].isAttending = true;
        isUserAttendingTheSession[_user][_sessionId] = true;
        userAttendanceInfo[_user][_sessionId].eventTime = block.timestamp;
        emit attendanceGiven(_user, _sessionId,block.timestamp);
      }

     // Read: View attendance history (per session or per user).
      function viewUsersAttendance(address _user) public 
      view returns( 
        string memory name,
        uint256 age,
        uint256 ticketId,
        bool isRegistered,
        address userAddress,
        uint256 sessionId
      ) {
        require(attendes[_user].user != address(0),"User Address Must Be Non Zero");
        require(attendes[_user].isRegistered, "User Must Be Registered");
        require(attendanceInformation[_user].isAttending ,"User must have an attendance");
        //userAttendanceInfo[_user][_sessionId].isAttending = true;
        Attendee storage user = attendes[_user];
        uint256 userSessionId = trackEachSessionUserAttendedUsingAddress[_user];
        return ( user.name,user.age,user.ticketId,user.isRegistered, user.userAddress, userSessionId);
           
      }

     // Update: Fix wrong entry (rare, only by admin).
     function updateAttendanceForUser(address _user, uint256 _sessionId, bool _attendanceStatus)
         external
         AdminsOnly(admin, 0)
        {
         require(attendes[_user].user != address(0), "Invalid user");
         require(userAttendanceInfo[_user][_sessionId].eventTime != 0, "No attendance record");

         userAttendanceInfo[_user][_sessionId].isAttending = _attendanceStatus;
         isUserAttendingTheSession[_user][_sessionId] = _attendanceStatus;
 
         if (_attendanceStatus) {
             userAttendanceInfo[_user][_sessionId].eventTime = block.timestamp;
         }

        emit attendanceUpdated(_user, _sessionId, _attendanceStatus, block.timestamp);
      }


     // Delete: Rare — better to just mark isPresent = false if needed.
    function deleteAttendanceForUser(address _user, uint256 _sessionId)
       external
       AdminsOnly(admin, 0)
      {
       require(attendes[_user].user != address(0), "Invalid user");
       require(userAttendanceInfo[_user][_sessionId].isAttending, "User not marked present");

       userAttendanceInfo[_user][_sessionId].isAttending = false;
       isUserAttendingTheSession[_user][_sessionId] = false;

       emit attendanceDeleted(_user, _sessionId);
      }


     // Minimal requirement: Create + Read
    


   //  mapping(address => uint256) trackSingleEventForSingleUser;
    // mapping(uint256 => address) tracksingleUserForSingleEvent1;
    //  mapping (uint256 => address[]) trackAllUsersOfSingleSession;
    //  mapping(address => mapping(uint256 => uint256)) singleTicketForSingleUserForSpecficEvent;
    //  mapping (address => mapping (address => uint256)) trackEachSessionUserAttendedUsingAddress1;
    //  mapping (address => mapping (uint256 => uint)) trackEachSessionUserAttendedUsingAttendedId1;
    //  mapping(address => bool) userMustAttendOnlyOneEventAtSpecficTime1;
    //  mapping(uint256 => mapping(uint256 => address)) tracksingleUserForSingleEvent;
    //  mapping(uint256 => mapping(uint256 => address[])) trackMultiUserForSingleEvent;
    //  mapping(address => mapping(uint256 =>uint256[])) trackMultiEventForSingleUser1;
    //  mapping(address => mapping(uint256 =>uint256)) trackSingleEventForSingleUser1;
    //  mapping(address => uint256) ticketIdToSingleUser;
    //  mapping(uint256 => mapping(uint256 => uint256[])) multiTicketForMultiEventForSingleUser;
    // mapping (address => Session) userToSessionMapping;
    // mapping(address => userSession[]) sessionToUsersMapping;
    // mapping (address => eventRole) userToItsRole;
    //mapping (uint256 => uint256[]) trackEachSessionUserAttendedUsingAttendedId;
   
}