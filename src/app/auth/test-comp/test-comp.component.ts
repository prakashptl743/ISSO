import { Component, OnInit, Renderer2, ViewEncapsulation } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { SchoolService } from "src/app/admin/service/school.service";
import { AuthService } from "../auth.service";
import { HttpClient } from "@angular/common/http";
import { ConfirmationService, SelectItem } from "primeng/api";
import { MessageService } from "primeng/api";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { StudentProfileService } from "src/app/admin/service/student-profile.service";
import { StudentService } from "src/app/admin/service/student.service";
import { IssoUtilService } from "src/app/services/isso-util.service";
import { forkJoin } from "rxjs";
export interface Student {
  id: number;
  name: string;
}
export interface Subgame {
  id: number;
  name: string;
  minCapacity: number;
  assignedCount: number; // To track how many students are currently assigned
}
export interface Assignment {
  studentId: number;
  subgameId: number;
  assignmentDate: Date; // To track when the assignment was made (optional, but good for "yesterday's data")
}

@Component({
  selector: "test-comp",
  templateUrl: "./test-comp.component.html",
  encapsulation: ViewEncapsulation.None,
  styleUrls: ["./test-comp.component.css"],
  providers: [MessageService, ConfirmationService],
})
export class TestCompComponent implements OnInit {
  students: Student[] = [];
  subgames: Subgame[] = [];
  // Tracks current assignments in the UI, mutable
  currentAssignments: Assignment[] = [];

  // Map to easily check which subgame a student is assigned to
  studentSubgameMap: Map<number, number> = new Map(); // studentId -> subgameId

  // Map to easily check current assigned count for each subgame
  subgameAssignedCountMap: Map<number, number> = new Map(); // subgameId -> count

  message: string | null = null;
  messageType: "success" | "danger" | "info" | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private studentProfileService: StudentProfileService,
    private messageService: MessageService,
    private issoUtilService: IssoUtilService,
    private studentService: StudentService,
    private renderer: Renderer2
  ) {}
  ngOnInit() {
    this.loadData();
  }
  loadData(): void {
    forkJoin([
      this.studentProfileService.getStudents(),
      this.studentProfileService.getSubgames(),
      this.studentProfileService.getPreviousAssignments(),
    ]).subscribe({
      next: ([students, subgames, previousAssignments]) => {
        this.students = students;
        this.subgames = subgames;

        // Initialize subgame assigned counts
        this.subgames.forEach((subgame) => {
          this.subgameAssignedCountMap.set(subgame.id, 0);
        });

        // Load previous assignments into currentAssignments and update maps
        this.currentAssignments = previousAssignments;
        this.currentAssignments.forEach((assignment) => {
          this.studentSubgameMap.set(
            assignment.studentId,
            assignment.subgameId
          );
          this.incrementSubgameCount(assignment.subgameId);
        });

        this.setMessage(
          "Data loaded successfully from previous session.",
          "info"
        );
      },
      error: (err) => {
        console.error("Error loading data:", err);
        this.setMessage("Failed to load data. Please try again.", "danger");
      },
    });
  }

  /**
   * Assigns a student to a subgame, checking capacity.
   * Handles deassignment if student is already in a subgame.
   */
  assignStudentToSubgame(studentId: number, subgameId: number): void {
    const studentName = this.getStudentName(studentId);
    const subgameName = this.getSubgameName(subgameId);
    const targetSubgame = this.subgames.find((sg) => sg.id === subgameId);

    if (!targetSubgame) {
      this.setMessage(
        `Error: Subgame not found for ID ${subgameId}.`,
        "danger"
      );
      return;
    }

    const currentAssignedSubgameId = this.studentSubgameMap.get(studentId);

    if (currentAssignedSubgameId === subgameId) {
      // Student is already assigned to this subgame
      this.setMessage(
        `${studentName} is already assigned to ${subgameName}.`,
        "info"
      );
      return;
    }

    // Check capacity if assigning to a new subgame
    if (
      this.subgameAssignedCountMap.get(subgameId)! >= targetSubgame.minCapacity
    ) {
      this.setMessage(
        `Capacity full for ${subgameName}. Cannot assign ${studentName}.`,
        "danger"
      );
      return;
    }

    // --- Deassign from previous subgame if any ---
    if (currentAssignedSubgameId !== undefined) {
      this.deassignStudentFromSubgame(studentId, currentAssignedSubgameId);
    }

    // --- Assign to new subgame ---
    const newAssignment: Assignment = {
      studentId,
      subgameId,
      assignmentDate: new Date(),
    };
    this.currentAssignments.push(newAssignment);
    this.studentSubgameMap.set(studentId, subgameId);
    this.incrementSubgameCount(subgameId);

    this.setMessage(
      `${studentName} successfully assigned to ${subgameName}.`,
      "success"
    );
  }

  /**
   * Deassigns a student from a specific subgame.
   * Used internally when reassigning or manually deassigning.
   */
  deassignStudentFromSubgame(
    studentId: number,
    subgameIdToDeassign: number
  ): void {
    const studentName = this.getStudentName(studentId);
    const subgameName = this.getSubgameName(subgameIdToDeassign);

    // Remove from currentAssignments array
    this.currentAssignments = this.currentAssignments.filter(
      (assignment) =>
        !(
          assignment.studentId === studentId &&
          assignment.subgameId === subgameIdToDeassign
        )
    );

    // Remove from studentSubgameMap
    if (this.studentSubgameMap.get(studentId) === subgameIdToDeassign) {
      this.studentSubgameMap.delete(studentId);
    }

    // Decrement assigned count
    this.decrementSubgameCount(subgameIdToDeassign);

    this.setMessage(`${studentName} deassigned from ${subgameName}.`, "info");
  }

  /**
   * Gets the currently assigned subgame ID for a student.
   * Returns `undefined` if not assigned.
   */
  getAssignedSubgameId(studentId: number): number | undefined {
    return this.studentSubgameMap.get(studentId);
  }

  /**
   * Helper to get student name by ID.
   */
  getStudentName(studentId: number): string {
    // return (
    //   this.students.find((s) => s.id === studentId)?.name ||
    //   `Student ${studentId}`
    // );
    const student = this.students.find((s) => s.id === studentId);
    return student ? student.name : `Student ${studentId}`;
  }

  /**
   * Helper to get subgame name by ID.
   */
  getSubgameName(subgameId: number): string {
    // return (
    //   this.subgames.find((sg) => sg.id === subgameId)?.name ||
    //   `Subgame ${subgameId}`
    // );

    const subgame = this.subgames.find((sg) => sg.id === subgameId);
    return subgame ? subgame.name : `Student ${subgameId}`;
  }

  /**
   * Helper to get subgame object by ID.
   */
  getSubgameById(subgameId: number): Subgame | undefined {
    return this.subgames.find((sg) => sg.id === subgameId);
  }

  /**
   * Increases the assigned count for a subgame.
   */
  private incrementSubgameCount(subgameId: number): void {
    const currentCount = this.subgameAssignedCountMap.get(subgameId) || 0;
    this.subgameAssignedCountMap.set(subgameId, currentCount + 1);
  }

  /**
   * Decreases the assigned count for a subgame.
   */
  private decrementSubgameCount(subgameId: number): void {
    const currentCount = this.subgameAssignedCountMap.get(subgameId) || 0;
    if (currentCount > 0) {
      this.subgameAssignedCountMap.set(subgameId, currentCount - 1);
    }
  }

  /**
   * Saves the current assignments to the "database".
   */
  saveAssignments(): void {
    this.studentProfileService
      .saveAssignments(this.currentAssignments)
      .subscribe({
        next: (success) => {
          if (success) {
            this.setMessage("Assignments saved successfully!", "success");
          } else {
            this.setMessage("Failed to save assignments.", "danger");
          }
        },
        error: (err) => {
          console.error("Error saving assignments:", err);
          this.setMessage(
            "An error occurred while saving assignments.",
            "danger"
          );
        },
      });
  }

  /**
   * Sets a message to display to the user.
   */
  setMessage(msg: string, type: "success" | "danger" | "info"): void {
    this.message = msg;
    this.messageType = type;
    // Clear message after some time
    setTimeout(() => {
      this.message = null;
      this.messageType = null;
    }, 5000); // Message disappears after 5 seconds
  }
  ngOnDestroy(): void {}
}
