package SpringBootPackage;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ActivityController {
  //standard constructors
  private final ActivityRepository activityRepository;

  public ActivityController(ActivityRepository activityRepository) {
    this.activityRepository = activityRepository;
  }

  @GetMapping("/activities")
  public List<Activity> getActivities() {
    return (List<Activity>) activityRepository.findAll();
  }

  @PostMapping("/activities")
  void addActivity(@RequestBody Activity activity){
    activityRepository.save(activity);
  }

  @PostMapping("/activities/delete")
  void deleteActivity(@RequestBody Activity activity) {
    activityRepository.delete(activity);
  }
}


